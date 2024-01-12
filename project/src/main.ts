import axios from 'axios';

async function getInstagramFollowerCount(accessToken: string, userId: string) {
  try {
    const response = await axios.get(`https://graph.instagram.com/${userId}?fields=followers_count&access_token=${accessToken}`);
    return response.data.followers_count;
  } catch (error) {
    console.error(`Error fetching Instagram follower count: ${error}`);
  }
}

const accessToken = '313b0e5222d9d366a205e1b5742292f2';
const userId = '52201310299';
getInstagramFollowerCount(accessToken, userId)
  .then(followerCount => console.log(`Follower count: ${followerCount}`));

/*import { Universe } from './universe';
import { Star } from './star';

const universe = new Universe();
//const star = new Star();*/
