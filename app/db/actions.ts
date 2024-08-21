"use server";

export async function addAccount(formData: FormData) {
  const data = {
    email: formData.get("account-name") as string,
  };

  // eslint-disable-next-line no-console
  console.log(data);
}
