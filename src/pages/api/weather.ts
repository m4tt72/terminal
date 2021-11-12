import axios from 'axios';
export default async function handler(req, res) {
  const { data } = await axios.get('https://wttr.in/?AT');

  res.status(200).json(data);
}
