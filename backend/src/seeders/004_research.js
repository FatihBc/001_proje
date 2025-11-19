/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("research").delete();

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
    {
      title: "Aritmi Tedavisinde Yeni Yaklaşımlar",
      field: "Kardiyoloji",
      start_date: "2024-06-01",
      end_date: "2025-06-01",
      description:
        "Aritmi tedavisinde minimal invaziv yöntemler araştırılıyor.",
    },
    {
      title: "Epilepsi Üzerine Genetik Çalışma",
      field: "Nöroloji",
      start_date: "2023-09-15",
      end_date: "2026-09-15",
      description:
        "Epilepsiye yatkınlıkta genetik faktörlerin rolü inceleniyor.",
    },
    {
      title: "Omurga Cerrahisi Sonrası Rehabilitasyon",
      field: "Ortopedi",
      start_date: "2025-01-01",
      end_date: "2026-01-01",
      description:
        "Omurga cerrahisi sonrası rehabilitasyon protokolleri değerlendiriliyor.",
    },
    {
      title: "Kalp Kapak Hastalıklarında Yeni İlaçlar",
      field: "Kardiyoloji",
      start_date: "2024-02-10",
      end_date: "2025-02-10",
      description:
        "Kalp kapak hastalıklarında farmakolojik tedavi seçenekleri inceleniyor.",
    },
    {
      title: "Multipl Skleroz Üzerine Klinik Çalışma",
      field: "Nöroloji",
      start_date: "2023-11-01",
      end_date: "2025-11-01",
      description: "MS hastalarında yeni tedavi protokolleri test ediliyor.",
    },
    {
      title: "Eklem Protezlerinde Yeni Malzemeler",
      field: "Ortopedi",
      start_date: "2025-04-01",
      end_date: "2026-04-01",
      description:
        "Eklem protezlerinde dayanıklılığı artıran yeni malzemeler araştırılıyor.",
    },
    {
      title: "Kalp Krizi Sonrası Yaşam Kalitesi",
      field: "Kardiyoloji",
      start_date: "2024-07-01",
      end_date: "2025-07-01",
      description:
        "Kalp krizi sonrası yaşam kalitesini artırmaya yönelik yöntemler inceleniyor.",
    },
  ]);
};
