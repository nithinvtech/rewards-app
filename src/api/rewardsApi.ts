import axios from 'axios';
import { BASE_URL } from '../constants/appConstants';

/**
 * Fetch rewards list from server with pagination support.
 *
 * @param page - The page number to request from API
 * @param limit - The number of rewards to return per page (default: 10)
 * @returns API response data (containing results + pagination info)
 */
export const fetchRewards = async (page: number,limit = 10) => {
  // Construct API endpoint dynamically, so page/limit remain flexible.
  const requestUrl = `${BASE_URL}/api/v1/clients/5189/bounties/?limit=${limit}&page=${page}`;

  // Execute network request using axios.
  const response = await axios.get(requestUrl);

  // Return API data.
  return response.data;
};
