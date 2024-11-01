console.log('Test Variable:', import.meta.env.VITE_TEST_VAR);

const searchGithub = async (since: number = 1) => {
  try {
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN); // Log the token

    const response = await fetch(
      `https://api.github.com/users?since=${since}`,
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

    const response = await fetch(`https://api.github.com/users/${username}`, {
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
