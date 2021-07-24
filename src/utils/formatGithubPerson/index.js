export default function formatGithubPerson(person) {
  return {
    title: person.nickname,
    imageUrl: `https://github.com/${person.nickname}.png`,
    pageUrl: `https://github.com/${person.nickname}`,
    id: person.id
  }
}
