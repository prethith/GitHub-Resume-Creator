import jsPDF from "jspdf";

export const generateCombinedPDF = async (
  userData,
  repos,
  commits,
  pullRequests,
  issues,
  languages,
  organizations
) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add a new page
  const addNewPage = () => {
    doc.addPage();
    addHeader();
    addFooter();
    return margin + 15;
  };

  // Helper function to add header
  const addHeader = () => {
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, pageWidth, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("GitHub Resume", pageWidth / 2, 10, { align: "center" });
  };

  // Helper function to add footer
  const addFooter = () => {
    doc.setFillColor(41, 128, 185);
    doc.rect(0, pageHeight - 10, pageWidth, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth - margin,
      pageHeight - 4,
      { align: "right" }
    );
  };

  // Helper function to add a section title
  const addSectionTitle = (title, y) => {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text(title, margin, y);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 1, pageWidth - margin, y + 1);
    return y + 10;
  };

  // Helper function to add content
  const addContent = (content, y, fontSize = 10) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94);
    doc.text(content, margin, y);
    return y + fontSize / 2 + 2;
  };

  // Start PDF generation
  addHeader();
  addFooter();

  // Add User Profile
  let y = margin + 15;
  y = addSectionTitle("User Profile", y);

  if (userData.avatar_url) {
    const imageResponse = await fetch(userData.avatar_url);
    const imageBlob = await imageResponse.blob();
    const imageData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(imageBlob);
    });
    doc.addImage(imageData, "PNG", margin, y, 30, 30);
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(41, 128, 185);
  doc.text(userData.name || userData.login, margin + 40, y + 10);

  y += 35;
  y = addContent(`Username: ${userData.login}`, y);
  y = addContent(`Location: ${userData.location || "N/A"}`, y);
  y = addContent(`Company: ${userData.company || "N/A"}`, y);
  y = addContent(`Blog: ${userData.blog || "N/A"}`, y);
  y = addContent(`Bio: ${userData.bio || "N/A"}`, y);

  // Add Summary
  y = addSectionTitle("Summary", y + 10);
  y = addContent(
    `Total Contributions: ${userData.public_repos + userData.public_gists}`,
    y
  );
  y = addContent(`Total Repositories: ${userData.public_repos}`, y);
  y = addContent(`Total Followers: ${userData.followers}`, y);
  y = addContent(`Total Following: ${userData.following}`, y);

  // Add Top Repositories
  y = addNewPage();
  y = addSectionTitle("Top Repositories", y);
  repos.forEach((repo, index) => {
    if (y > pageHeight - margin - 40) y = addNewPage();
    y = addContent(`${index + 1}. ${repo.name}`, y, 12);
    y = addContent(`   Description: ${repo.description || "N/A"}`, y);
    y = addContent(
      `   Language: ${repo.language || "N/A"} | Stars: ${
        repo.stargazers_count
      } | Forks: ${repo.forks_count}`,
      y
    );
    y += 5;
  });

  // Add Recent Contributions
  y = addNewPage();
  y = addSectionTitle("Recent Contributions", y);

  y = addContent("Recent Commits:", y, 12);
  commits.slice(0, 5).forEach((commit) => {
    if (y > pageHeight - margin - 40) y = addNewPage();
    y = addContent(`• ${commit.commit.message.split("\n")[0]}`, y);
    y = addContent(
      `  ${new Date(commit.commit.author.date).toLocaleDateString()}`,
      y
    );
    y += 2;
  });

  y = addContent("Recent Pull Requests:", y + 5, 12);
  pullRequests.slice(0, 5).forEach((pr) => {
    if (y > pageHeight - margin - 40) y = addNewPage();
    y = addContent(`• ${pr.title}`, y);
    y += 2;
  });

  y = addContent("Recent Issues:", y + 5, 12);
  issues.slice(0, 5).forEach((issue) => {
    if (y > pageHeight - margin - 40) y = addNewPage();
    y = addContent(`• ${issue.title}`, y);
    y += 2;
  });

  // Add Languages
  y = addNewPage();
  y = addSectionTitle("Most Used Languages", y);
  const languageNames = Object.keys(languages);
  const languageCounts = Object.values(languages);
  languageNames.forEach((language, index) => {
    if (y > pageHeight - margin - 40) y = addNewPage();
    y = addContent(`${language}: ${languageCounts[index]} repositories`, y);
    y += 2;
  });

  // Add Organizations
  y = addSectionTitle("Organizations", y + 10);
  organizations.forEach((org) => {
    if (y > pageHeight - margin - 40) y = addNewPage();
    y = addContent(`• ${org.login}`, y);
    y += 2;
  });

  doc.save(`${userData.login}-github-resume.pdf`);
};
