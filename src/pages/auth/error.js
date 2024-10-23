export default function ErrorPage({ error }) {
    return (
      <div>
        <h1>Authentication Error</h1>
        <p>{error}</p>
      </div>
    );
  }
  
  // Optional: Use NextAuth to pass the error
  export async function getServerSideProps(context) {
    const { query } = context;
    return {
      props: {
        error: query.error || 'Unknown error occurred.',
      },
    };
  }
  