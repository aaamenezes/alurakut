export default function formatGithubPerson(nickname) {
  return {
    title: nickname,
    imageUrl: `https://github.com/${nickname}.png`,
    pageUrl: `https://github.com/${nickname}`
  }
}
