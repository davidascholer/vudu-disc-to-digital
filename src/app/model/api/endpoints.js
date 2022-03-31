
//Configure server endpoints.
const movieDataEndpoint = '/vudu/api/data';
const movieDataFromUPCsEndpoint = '/vudu/api/movie_data_from_upcs';
const createAccountEndpoint = '/vudu/api/create_account';
const getAccountEndpoint = '/vudu/api/get_account';
const purchaseTokensEndpoint = '/vudu/api/purchase_tokens_stripe';
const redeemTokenEndpoint = '/vudu/api/redeem_token';
const receiptsEndpoint = '/vudu/api/receipts';
const genPWCodeEndpoint = '/vudu/api/generateResetCode';
const resetPWEndpoint = '/vudu/api/resetUserPW';
const getStripeSecretEndpoint = '/vudu/api/get_stripe_secret';
// const saveReceiptEndpoint = '/vudu/api/save_receipt';
const contactEndpoint = '/mailer/api/email_forwarder';

module.exports = {
    movieDataEndpoint,
    movieDataFromUPCsEndpoint,
    createAccountEndpoint,
    getAccountEndpoint,
    purchaseTokensEndpoint,
    redeemTokenEndpoint,
    receiptsEndpoint,
    contactEndpoint,
    resetPWEndpoint,
    genPWCodeEndpoint,
    getStripeSecretEndpoint,
    // saveReceiptEndpoint,
}