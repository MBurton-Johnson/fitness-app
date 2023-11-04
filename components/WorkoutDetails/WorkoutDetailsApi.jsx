
export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/workouts/${id}`);
    const workout = await res.json();
    console.log(workout);
  
    return {
      props: { workout },
    };
  }
  