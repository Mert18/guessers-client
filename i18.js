import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      tr: {
        translation: {
          login: "Giriş Yap",
          register: "Kayıt Ol",
          logout: "Çıkış Yap",
          room: "Oda",
          eventCreate: "Etkinlik Oluştur",
          invite: "Davet Et",
          invites: "Davetler",
          balance: "Bakiye",
          days: "gün",
          hours: "saat",
          minutes: "dakika",
          before: "önce",
          roomName: "Oda Adı",
          roomSelect: "Oda Seç",
          roomCreate: "Oda Oluştur",
          roomDescription: "Oda Açıklaması",
          roomTopPredictors: "En İyi Tahminciler",
          roomRichests: "En Zenginler",
          username: "Kullanıcı Adı",
          password: "Şifre",
          amount: "Miktar",
          events: "Etkinlikler",
          eventName: "Etkinlik Adı",
          eventDescription: "Etkinlik Açıklaması",
          optionName: "Seçenek Adı",
          optionOdds: "Seçenek Oranı",
          totalOdds: "Toplam Oran",
          date: "Tarih",
          status: "Durum",
          inProgress: "Devam Ediyor",
          won: "Kazandı",
          lost: "Kaybetti",
          cancelled: "İptal Edildi",
          unknown: "Bilinmiyor",
          loginInstead: "Hesabınız var mı? Giriş yapın",
          language: "Dil",
          betSlips: "Bahis Kuponları",
        },
      },
      en: {
        translation: {
          login: "Login",
          register: "Register",
          logout: "Logout",
          room: "Room",
          eventCreate: "Create Event",
          invite: "Invite",
          invites: "Invites",
          balance: "Balance",
          days: "days",
          hours: "hours",
          minutes: "minutes",
          before: "before",
          roomName: "Room Name",
          roomSelect: "Select Room",
          roomCreate: "Create Room",
          roomDescription: "Room Description",
          roomTopPredictors: "Top Predictors",
          roomRichests: "Richests",
          username: "Username",
          password: "Password",
          amount: "Amount",
          events: "Events",
          eventName: "Event Name",
          eventDescription: "Event Description",
          optionName: "Option Name",
          optionOdds: "Option Odds",
          totalOdds: "Total Odds",
          date: "Date",
          status: "Status",
          inProgress: "In Progress",
          won: "Won",
          lost: "Lost",
          cancelled: "Cancelled",
          unknown: "Unknown",
          loginInstead: "Already have an account? Login",
          language: "Language",
          betSlips: "Bet Slips",
        },
      },
    },
  });