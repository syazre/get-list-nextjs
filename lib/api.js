export const getClientbyId = async (id) => {
    const res = await fetch(`https://syazre.free.beeceptor.com/my/api/client/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const responseJson = await res.json();
    return responseJson;
  };