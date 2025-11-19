/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("location").delete();

  await knex("location").insert([
    {
      hospital_name: "Pendik Eğitim ve Araştırma Hastanesi",
      city: "İstanbul",
      address: "Pendik Mah.",
    },
    {
      hospital_name: "Cerrahpaşa Tıp Fakültesi",
      city: "İstanbul",
      address: "Fatih Mah.",
    },
    {
      hospital_name: "Ege Üniversitesi Hastanesi",
      city: "İzmir",
      address: "Bornova Mah.",
    },
  ]);
};
