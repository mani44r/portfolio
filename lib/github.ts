/** Server-side GitHub stats — cached 1 hour. */
export type GitHubStats = {
  username: string;
  repos: number;
  followers: number;
  languages: { name: string; percent: number }[];
  chartUrl: string;
};

const USERNAME = 'mani44r';

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'mani-portfolio' };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();
    if (!Array.isArray(repos)) return null;

    const langCount: Record<string, number> = {};
    for (const repo of repos) {
      if (!repo.language) continue;
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }

    const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(langCount)
      .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 6);

    return {
      username: USERNAME,
      repos: user.public_repos ?? repos.length,
      followers: user.followers ?? 0,
      languages,
      chartUrl: `https://ghchart.rshah.org/${USERNAME}`,
    };
  } catch {
    return null;
  }
}

export const GITHUB_FALLBACK: GitHubStats = {
  username: USERNAME,
  repos: 17,
  followers: 0,
  languages: [
    { name: 'Python', percent: 45 },
    { name: 'HTML', percent: 20 },
    { name: 'TypeScript', percent: 15 },
    { name: 'Jupyter Notebook', percent: 12 },
    { name: 'JavaScript', percent: 8 },
  ],
  chartUrl: `https://ghchart.rshah.org/${USERNAME}`,
};
