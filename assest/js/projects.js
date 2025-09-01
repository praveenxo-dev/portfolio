document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("projects-container");
  const username = "Blood-titan";

  // ⚠️ Replace this with your GitHub fine-grained token (read-only public repo access)
  const token = "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";

  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
            }
          }
        }
      }
    }
  `;

  try {
   container.innerHTML = `
  <div style="display:flex; flex-direction:column; align-items:center; margin-top:2rem;">
    <div class="loader"></div>
    <p style="color:#aaa; margin-top:1rem;">Loading projects...</p>
  </div>
`;


    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ query })
    });

    const json = await res.json();

    if (!json.data || !json.data.user) {
      throw new Error("Invalid API response");
    }

    const pinned = json.data.user.pinnedItems.nodes;
    container.innerHTML = ""; // Clear loading message

    if (pinned.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>📭 No pinned projects found.</p>";
      return;
    }

    pinned.forEach((repo) => {
      const card = document.createElement("div");
      card.className = "project-card";

      let repoName =
        repo.name.length > 22 ? repo.name.substring(0, 22) + "..." : repo.name;

      let description = repo.description
        ? repo.description
        : "🚧 Work in progress. More details soon!";

      card.innerHTML = `
        <div class="project-title">${repoName}</div>
        <div class="project-desc">${description}</div>
        <div class="project-links">
          <a href="${repo.url}" target="_blank" class="btn">GitHub</a>
          ${
            repo.homepageUrl
              ? `<a href="${repo.homepageUrl}" target="_blank" class="btn">Live Demo</a>`
              : ""
          }
        </div>
      
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching pinned repos:", err);
    container.innerHTML =
      "<p style='text-align:center; color:#aaa;'>⚠️ Could not load pinned projects right now.</p>";
  }

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
      