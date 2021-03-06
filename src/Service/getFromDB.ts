const getFromDB = async (path: string) => {
  try {
    const url = `https://x-check-dc82a.firebaseio.com/${path}.json`;
    const res: any = await fetch(url);
    return res.ok ? res.json() : res;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export default getFromDB;
