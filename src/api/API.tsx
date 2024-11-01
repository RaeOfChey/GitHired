// console.log('Test Variable:', import.meta.env.VITE_TEST_VAR);
const searchGithub = async () => {
  try {
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN); // Log the token

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN); // Log the token

    const response = await fetch(`https://api.github.com/users/${username}/hovercard`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    console.error('An error occurred:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
