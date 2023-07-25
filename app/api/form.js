// Assuming you have a form with input fields for title and content
const handleSubmit = (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const content = e.target.content.value;

  if (!title || !content) {
    // Show an error message or a validation error
    console.log('Title or content is missing');
    return;
  }

  // Proceed with submitting the form
  fetch('${process.env.NEXT_PUBLIC_API_URL', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Response from server:', data);
      // Handle the response from the server
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error case
    });
};

// Render your form component
const Form = () => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="content" placeholder="Content" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
