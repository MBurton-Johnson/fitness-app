
export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3006/workouts/${id}`);
    const workout = await res.json();
    console.log(workout);
  
    return {
      props: { workout },
    };
  }
  