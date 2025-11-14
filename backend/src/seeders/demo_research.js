/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("research").truncate();

  await knex("research").insert([
    {
      title: "Kalp Yetmezliği Üzerine Klinik Çalışma",
      field: "Kardiyoloji",
      start_date: "2024-01-15",
      end_date: "2024-12-15",
      description:
        "Kalp yetmezliği tedavisinde yeni ilaçların etkinliği araştırılıyor.",
    },
    {
      title: "Parkinson Hastalığı Erken Tanı Araştırması",
      field: "Nöroloji",
      start_date: "2023-05-01",
      end_date: "2025-05-01",
      description: "Erken tanı için biyobelirteçlerin incelenmesi.",
    },
    {
      title: "Kemik İyileşmesi Üzerine Deneysel Çalışma",
      field: "Ortopedi",
      start_date: "2025-03-10",
      end_date: "2026-03-10",
      description: "Yeni biyomateryallerin kemik iyileşmesine etkisi.",
    },
  ]);
};
