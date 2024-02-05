export const handleMdxFile = async (slug: string, content: string) => {
  try {
    const response = await fetch('/api/createMdxFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, content }),
    });

    if (!response.ok) {
      throw new Error('An error occurred while creating the file.');
    }

    const data = await response.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert('An error occurred while creating the file.');
  }
};
