export default async function UseRequest(url, options) {
  return await fetch(url, options).then(res => res.json())
}