document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");
  const username = "Blood-titan";

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then((res) => res.json())
    .then((repos) => {
      const filtered = repos.filter((repo) => !repo.fork);

      filtered.slice(0, 9).forEach((repo) => {
        const card = document.createElement("div");
        card.className = "project-card";

        // Truncate long names
        let repoName =
          repo.name.length > 22
            ? repo.name.substring(0, 22) + "..."
            : repo.name;

        // Placeholder desc if missing
        let description = repo.description
          ? repo.description
          : "🚧 Work in progress. More details soon!";

        card.innerHTML = `
          <div class="project-title">${repoName}</div>
          <div class="project-desc">${description}</div>
          <div class="project-links">
            <a href="${repo.html_url}" target="_blank" class="btn">GitHub</a>
            ${
              repo.homepage
                ? `<a href="${repo.homepage}" target="_blank" class="btn">Live Demo</a>`
                : ""
            }
          </div>
        `;

        container.appendChild(card);
      });

      // Add "View More" button at the very bottom
      const moreWrapper = document.createElement("div");
      moreWrapper.style.textAlign = "center";
      moreWrapper.style.marginTop = "3rem";

      moreWrapper.innerHTML = `
        <a href="https://github.com/${username}?tab=repositories" target="_blank" class="btn">
          🔗 View More on GitHub
        </a>
      `;

      container.after(moreWrapper);
    })
    .catch((err) => {
      console.error("Error fetching repos:", err);
      container.innerHTML =
        "<p style='text-align:center; color:#aaa;'>⚠️ Could not load projects right now.</p>";
    });
});
