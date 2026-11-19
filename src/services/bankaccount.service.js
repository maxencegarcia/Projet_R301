import LocalSource from "@/services/localsource.service.js";

async function getAccountAmountFromLocalSource(number) {
  // récupération auprès de la source locale
  return LocalSource.getAccountAmount(number)
}
/*
async function getAccountAmountFromAPI(number) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function getAccountTransactionsFromLocalSource(number) {
  // récupération auprès de la source locale
  return LocalSource.getAccountTransactions(number)
}
/*
async function getAccountTransactionsFromAPI(number) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function getAccountAmount(number) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAccountAmountFromLocalSource(number)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le solde du compte'}
  }
  return response
}

async function getAccountTransactions(number) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAccountTransactionsFromLocalSource(number)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer les transactions du compte'}
  }
  return response
}

export default {
  getAccountAmount,
  getAccountTransactions,
}
