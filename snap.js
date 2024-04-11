async function createRequest(endpoint,body,query,header){

    var axios = require("axios");
    const https = require("https");
    var moment = require("moment");
    var host = 'https://apidevportal.aspi-indonesia.or.id:44310/api/';
    const clientId = config.midtrans.clientId;
    const timestamp = moment().format("YYYY-MM-DDTHH:mm:ssZ");

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    var headerParam = {
        "Content-Type": "application/json",
        "X-TIMESTAMP": timestamp,
        "X-CLIENT-KEY":clientId,
    };
    console.log('endpoint ==========', endpoint)
    console.log('body ==========', body)
    console.log('query ==========', query)
    console.log('header ==========', header)
    for (let property in header) {
        headerParam[property] = header[property];
    };

    try{
        var result = await axios.post(host+endpoint+query,
           body !== 1 ? body : {}
        ,{
            headers: headerParam,
         
        });

        if(result.data && result.data !== ''){
            console.log(result.config)
            return result.data
        };
    }catch(e){
        console.log(e);
    };
}

async function deleteRequest(endpoint,body,header){

    var axios = require("axios");
    const https = require("https");
    var moment = require("moment");
    var host = 'https://apidevportal.aspi-indonesia.or.id:44310/api/';
    const clientId = config.midtrans.clientId;
    const timestamp = moment().format("YYYY-MM-DDTHH:mm:ssZ");

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    var headerParam = {
        "Content-Type": "application/json",
        "X-TIMESTAMP": timestamp,
        "X-CLIENT-KEY":clientId,
    };
   
    for (let property in header) {
        headerParam[property] = header[property];
    };

    try{
        var result = await axios.delete(host+endpoint,{
                data:body,
                headers: headerParam,
        }
           
        );

        if(result.data && result.data !== ''){
            return result.data
        };
    }catch(e){
        console.log(e);
    };
}

async function getRequest(endpoint,query,header){

    var axios = require("axios");
    const https = require("https");
    var moment = require("moment");
    var host = 'https://apidevportal.aspi-indonesia.or.id:44310/api/';
    const clientId = config.midtrans.clientId;
    const timestamp = moment().format("YYYY-MM-DDTHH:mm:ssZ");

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    var headerParam = {
        "Content-Type": "application/json",
        "X-TIMESTAMP": timestamp,
        "X-CLIENT-KEY":clientId,
    };

    for (let property in header) {
        headerParam[property] = header[property];
    };

    try{
        var result = await axios.get(host+endpoint+'?'+query,
        {
            headers: headerParam,
         
        });

        console.log(result)
        if(result.data && result.data !== ''){
            return result.data
        };
    }catch(e){
        console.log(e);
    };
}

async function getSignature(){

    const privateKey = config.midtrans.privateKey ;
    let endpoint = "v1.0/utilities/signature-auth"
    let header = {
        "Private_Key":privateKey
    }

    try{
        var result = await createRequest(endpoint,1,"?",header);
        if(result){
            return result.signature
        }
    }catch(e){
        console.log(e)
    }
    
}

async function getSignatureService(EndpoinUrl,AccessToken,body){

    let endpoint = 'v1.0/utilities/signature-service'
    let clientSecret = config.mandiri.clientSecret
    let header = {
        "X-CLIENT-SECRET":clientSecret,
        "HttpMethod":'POST',
        "EndpoinUrl":EndpoinUrl,
        "AccessToken":AccessToken,
    }

    let bodyRequest = body

    try{
        var result = await createRequest(endpoint,bodyRequest,"?",header);
        if(result){
            return result.signature
        }
    }catch(e){
        console.log(e)
    }
    
}

async function getSignatureServiceDelete(EndpoinUrl,AccessToken,body){

    let endpoint = 'v1.0/utilities/signature-service'
    let clientSecret = config.midtrans.clientSecret
    let header = {
        "X-CLIENT-SECRET":clientSecret,
        "HttpMethod":'DELETE',
        "EndpoinUrl":EndpoinUrl,
        "AccessToken":AccessToken,
    }

    let bodyRequest = body

    try{
        var result = await createRequest(endpoint,bodyRequest,header);
        if(result){
            return result.signature
        }
    }catch(e){
        console.log(e)
    }
    
}

async function getSignatureServiceGet(EndpoinUrl,AccessToken,body){

    let endpoint = 'v1.0/utilities/signature-service'
    let clientSecret = config.midtrans.clientSecret
    let header = {
        "X-CLIENT-SECRET":clientSecret,
        "HttpMethod":'GET',
        "EndpoinUrl":EndpoinUrl,
        "AccessToken":AccessToken,
    }

    let bodyRequest = body

    try{
        var result = await createRequest(endpoint,1,"?",header);
        if(result){
            return result.signature
        }
    }catch(e){
        console.log(e)
    }
    
}

// getSignature()
async function getToken(){
    const signature = await getSignature();
    let endpoint = "v1.0/access-token/b2b"
    let header = {
        "X-SIGNATURE":signature
    };

    let body = {
        "grantType":"client_credentials",
        "additionalInfo":{
       
        }
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        console.log(result)
        if(result){
            return result.accessToken
        }
    }catch(e){
        console.log(e)
    }
}
//getToken()

async function getAuthCode(){
    var moment = require("moment");
    let clientSecret = 'zsJl2V3gBio5An1u95sX8oVAANqMIgdmLLI4qkcXQa4='
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let seamData = encodeURIComponent(JSON.stringify({"mobileNumber":"62822999999"}))
    let query = 'state=WodkkwijSDs&scopes=QUERY_BALANCE,PUBLIC_ID&redirectUrl=https://stg.travelio.com?geturl.htm&seamlessData='+  encodeURIComponent(seamData) + '&seamlessSign='+ encodeURIComponent(SHA256(seamData))
    let endpoint = "v1.0/get-auth-code";
    let endpointSgntr = "/api/v1.0/get-auth-code?"+query;
   


    let body = {
        "mobileNumber":"6282154525153",
        "paymentType":"gopay"
    };
    const signature = await getSignatureServiceGet(endpointSgntr,accessToken,body);
    

    const signatures = SHA256('GET:'+endpointSgntr+':'+accessToken+'::2024-03-22T17:19:22+07:00')
    //"signature": "a6g2/myq8RtSixOzSgxMUi8vWtJy22z9eiS9r9kdB00VargNqCEIInHX3kVWEKMcKwqQx17j+zg5m1RUeeWqpA=="
    console.log(signature)
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await getRequest(endpoint,query,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//getAuthCode()

/**
 * =====================================================================================================
 *                                             REGISTRATION
 * =====================================================================================================
 */

async function registrationAccountBinding(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId ;
    let endpoint = "v1.0/registration-account-binding";
    let endpointSgntr = "/api/v1.0/registration-account-binding";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "action":"otpLinkage",
        "additionalData":{
           "userId":"John Doe",
           "email":"john.doe@email.com",
           "postalAddress":"134346"
        },
        "authCode":"4b203fe6c11548bcabd8da5bb087a83b",
        "grantType":"AUTHORIZATION_CODE",
        "isBindAndPay":"N",
        "lang":"EN",
        "locale":"en_ID",
        "merchantId":"00007100010926",
        "subMerchantId":"310928924949487",
        "msisdn":"+62812345678901",
        "otp":"34564367",
        "phoneNo":"0899345678864332",
        "platformType":"app",
        "redirectUrl":"merchantapp://main_page",
        "referenceId":"08400000814-08400000814",
        "refreshToken":"201208134b203fe6c11548bcabd8da5bb087a83b ",
        "successParams":{
           "accountId":"ABCD1234-EF56-GH78-IJ90-KLMNOP123456"
        },
        "terminalId":"ID",
        "tokenRequestorId":"e-commerceA",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//registrationAccountBinding()

async function registrationAccountInquiry(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId ;
    let endpoint = "v1.0/registration-account-inquiry";
    let endpointSgntr = "/api/v1.0/registration-account-inquiry";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//registrationAccountInquiry()

async function registrationAccountUnbinding(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/registration-account-unbinding";
    let endpointSgntr = "/api/v1.0/registration-account-unbinding";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "linkId":"abcd1234efgh5678ijkl9012",
        "merchantId":"00007100010926",
        "subMerchantId":"310928924949487",
        "tokenId":"Aeox320xvijwefop10",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//registrationAccountUnbinding()

/**
 * =====================================================================================================
 *                                             TRANSFER KREDIT
 * =====================================================================================================
 */

async function externalAccountInquiry(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/account-inquiry-external";
    let endpointSgntr = "/api/v1.0/account-inquiry-external";

    let body = {
        "beneficiaryBankCode":"008",
        "beneficiaryAccountNo":"8000800808",
        "partnerReferenceNo":"2020102900000000000001",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
    };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//externalAccountInquiry()

async function sknTriggerTransfer(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-skn";
    let endpointSgntr = "/api/v1.0/transfer-skn";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "beneficiaryAccountName":"Yories Yolanda",
        "beneficiaryAccountNo":"8000800808",
        "beneficiaryAddress":"Palembang",
        "beneficiaryBankCode":"008",
        "beneficiaryBankName":"Bank BRI",
        "beneficiaryCustomerResidence":"1",
        "beneficiaryCustomerType":"1",
        "beneficiaryEmail":"yories.yolanda@work.bri.co.id",
        "currency":"IDR",
        "customerReference":"10052019",
        "feeType":"BEN",
        "kodepos":"12250",
        "receiverPhone":"080901020304",
        "remark":"remark test",
        "senderCustomerResidence":"1",
        "senderCustomerType":"1",
        "senderPhone":"080901020304",
        "sourceAccountNo":"2000200202",
        "transactionDate":"2019-07-03T12:08:56-07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// sknTriggerTransfer()

async function rtgsTriggerTransfer(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-rtgs";
    let endpointSgntr = "/api/v1.0/transfer-rtgs";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "beneficiaryAccountName":"Yories Yolanda",
        "beneficiaryAccountNo":"8000800808",
        "beneficiaryAddress":"Palembang",
        "beneficiaryBankCode":"008",
        "beneficiaryBankName":"Bank BRI",
        "beneficiaryCustomerResidence":"1",
        "beneficiaryCustomerType":"1",
        "beneficiaryEmail":"yories.yolanda@work.bri.co.id",
        "currency":"IDR",
        "customerReference":"10052019",
        "feeType":"BEN",
        "kodepos":"12250",
        "receiverPhone":"080901020304",
        "remark":"remark test",
        "senderCustomerResidence":"1",
        "senderCustomerType":"1",
        "senderPhone":"080901020304",
        "sourceAccountNo":"2000200202",
        "transactionDate":"2019-07-03T12:08:56-07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// rtgsTriggerTransfer()

async function transferIntrabank(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transfer-intrabank";
    let endpointSgntr = "/api/v1.0/transfer-intrabank";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "beneficiaryAccountNo":"2000100101",
        "beneficiaryEmail":"yories.yolanda@work.bri.co.id ",
        "currency":"IDR",
        "customerReference":"10052019",
        "feeType":"BEN",
        "remark":"remark test",
        "sourceAccountNo":"2000200202",
        "transactionDate":"2019-07-03T12:08:56-07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//transferIntrabank()

async function transferInterbank(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transfer-interbank";
    let endpointSgntr = "/api/v1.0/transfer-interbank";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "beneficiaryAccountName":"Yories Yolanda",
        "beneficiaryAccountNo":"8000800808",
        "beneficiaryAddress":"Palembang",
        "beneficiaryBankCode":"008",
        "beneficiaryBankName":"Bank BRI",
        "beneficiaryEmail":"yories.yolanda@work.bri.co.id",
        "currency":"IDR",
        "customerReference":"10052019",
        "sourceAccountNo":"2000200202",
        "transactionDate":"2019-07-03T12:08:56-07:00",
        "feeType":"OUR",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//transferInterbank()

async function transferRequestForPayment(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-request-for-payment";
    let endpointSgntr = "/api/v1.0/transfer-request-for-payment";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "bankCode":"014",
        "beneficiaryAccountNo":"888801000003301",
        "beneficiaryAccountName":"Yories Yolanda",
        "remark":"remark test",
        "expiredDatetime":"2022-12-22T08:01:16+07:00",
        "sourceAccountNo":"888801000157508",
        "sourceAccountName":"Yories Yolanda",
        "currency":"IDR",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "feeType":"BEN",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// transferRequestForPayment()

async function transferInterbankBulk(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-interbank-bulk";
    let endpointSgntr = "/api/v1.0/transfer-interbank-bulk";

    let body = {
        "partnerBulkId":"2020102900000000000001",
        "currency":"IDR",
        "customerReference":"10052019",
        "feeType":"BEN",
        "remark":"remark test",
        "sourceAccountNo":"888801000157508",
        "transactionDate":"2019-07-03T12:08:56-07:00",
        "bulkObject":[
           {
              "partnerReferenceNo":"2020102900000000000990",
              "bankCode":"014",
              "beneficiaryAccountNo":"888801000003301",
              "beneficiaryAccountName":"Yories Yolanda",
              "amount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              }
           }
        ],
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// transferInterbankBulk()

async function transferInterbankBulkNotify(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-interbank-bulk/notify";
    let endpointSgntr = "/api/v1.0/transfer-interbank-bulk/notify";

    let body = {
        "bulkId":"2020102977770000000009",
        "partnerBulkId":"2020102900000000000001",
        "bulkObject":[
           {
              "originalReferenceNo":"2020102977770000000009",
              "originalPartnerReferenceNo":"2020102900000000000990",
              "responseCode":"2000000",
              "responseMessage":"Request has been processed successfully",
              "amount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              },
              "beneficiaryAccountNo":"888801000003301",
              "beneficiaryBankCode":"002",
              "sourceAccountNo":"888801000157508",
              "traceNo":"10052019"
           }
        ],
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// transferInterbankBulkNotify()

async function transferRtgsNotify(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-rtgs/notify";
    let endpointSgntr = "/api/v1.0/transfer-rtgs/notify";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"10052019",
        "latestTransactionStatus":"00",
        "amount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "beneficiaryAccountName":"Yories Yolanda",
        "beneficiaryAccountNo":"8000800808",
        "beneficiaryBankCode":"008",
        "sourceAccountNo":"2000200202",
        "transactionDate":"2020-12-21T14:06:21+07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// transferRtgsNotify()

async function transferSknNotify(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transfer-skn/notify";
    let endpointSgntr = "/api/v1.0/transfer-skn/notify";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"10052019",
        "latestTransactionStatus":"00",
        "amount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "beneficiaryAccountName":"Yories Yolanda",
        "beneficiaryAccountNo":"8000800808",
        "beneficiaryBankCode":"008",
        "sourceAccountNo":"2000200202",
        "transactionDate":"2020-12-21T14:06:21+07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// transferSknNotify()

async function transferStatus(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transfer/status";
    let endpointSgntr = "/api/v1.0/transfer/status";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"30443786930722726463280097920912",
        "serviceCode":"17",
        "transactionDate":"2019-07-03T12:08:56-07:00",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//transferStatus()

/**
 * =====================================================================================================
 * TRANSFER KREDIT
 * =====================================================================================================
 * MPM-QR
 * =====================================================================================================
 */
async function qrQrMpmGenerate(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId ;
    let endpoint = "v1.0/qr/qr-mpm-generate";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-generate";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "feeAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "storeId":"abcd",
        "terminalId":"213141251124",
        "validityPeriod":"2009-07-03T12:08:56-07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrQrMpmGenerate()

async function qrQrMpmDecode(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/qr-mpm-decode";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-decode";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "qrContent":"00020101....",
        "amount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "merchantId":"merch00001",
        "subMerchantId":"23489182303312",
        "scanTime":"2020-12-23T08:27:11+07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrQrMpmDecode()

async function qrApplyOtt(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/apply-ott";
    let endpointSgntr = "/api/v1.0/qr/apply-ott";

    let body = {
        "userResources":[
           "OTT"
        ],
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrApplyOtt()

async function qrQrMpmPayment(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/qr-mpm-payment";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-payment";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "feeAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "otp":"12345678",
        "verificationId":"310928924949487",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrQrMpmPayment()

async function qrQrMpmQuery(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/qr-mpm-query";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-query";

    let body = {
        "originalReferenceNo":"2020102977770000000009",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalExternalId":"30443786930722726463280097920912",
        "serviceCode":"17",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "externalStoreID ":"124928924949487",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrQrMpmQuery()

async function qrQrMpNotify(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/qr-mpm-notify";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-notify";

    let body = {
        "originalReferenceNo":"2020102977770000000009",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "latestTransactionStatus":"00",
        "transactionStatusDesc":"success",
        "customerNumber":"17081945",
        "accountType":"tabungan",
        "destinationNumber":"2000200202",
        "destinationAccountName":"John Doe",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "sessionID":"0UYEB77329002HY",
        "bankCode":"002",
        "externalStoreID":"124928924949487",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrQrMpNotify()

async function qrQrMpmCancel(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/qr-mpm-cancel";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-cancel";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"30443786930722726463280097920912",
        "merchantId":"00007100010926",
        "subMerchantId":"310928924949487",
        "externalStoreId":"124928924949487",
        "reason":"cancel reason",
        "amount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
 //qrQrMpmCancel()

async function qrQrMpmRefund(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/qr/qr-mpm-refund";
    let endpointSgntr = "/api/v1.0/qr/qr-mpm-refund";

    let body = {
        "merchantId":"00007100010926",
        "subMerchantId":"310928924949487",
        "externalStoreId":"124928924949487",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"10052019",
        "partnerRefundNo":"239850918204981205970",
        "refundAmount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "reason":"Customer complain",
        "additionalInfo":null
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// qrQrMpmRefund()

/**
 * =====================================================================================================
 * TRANSFER KREDIT
 * =====================================================================================================
 * VIRTUAL ACCOUNT
 * =====================================================================================================
 */

async function transferVaCreateVa(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transfer-va/create-va";
    let endpointSgntr = "/api/v1.0/transfer-va/create-va";

    let body = {
        "partnerServiceId":"  088899",
        "customerNo":"12345678901234567890",
        "virtualAccountNo":"  08889912345678901234567890",
        "virtualAccountName":"Jokul Doe",
        "virtualAccountEmail":"jokul@email.com",
        "virtualAccountPhone":"6281828384858",
        "trxId":"abcdefgh1234",
        "totalAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "billDetails":[
           {
              "billCode":"01",
              "billNo":"123456789012345678",
              "billName":"Bill A for Jan",
              "billShortName":"Bill A",
              "billDescription":{
                 "english":"Maintenance",
                 "indonesia":"Pemeliharaan"
              },
              "billSubCompany":"00001",
              "billAmount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              },
              "additionalInfo":{
             
              }
           }
        ],
        "freeTexts":[
           {
              "english":"Free text",
              "indonesia":"Tulisan bebas"
           }
        ],
        "virtualAccountTrxType":"1",
        "feeAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "expiredDate":"2020-12-31T23:59:59-07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// console.log('transferVaCreateVa')
 transferVaCreateVa()

async function transferVaDeleteVa(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transfer-va/delete-va";
    let endpointSgntr = "/api/v1.0/transfer-va/delete-va";

    let body = {
        "partnerServiceId":"  088899",
        "customerNo":"12345678901234567890",
        "virtualAccountNo":"  08889912345678901234567890",
        "trxId":"abcdefgh1234",
        "additionalInfo":{
       
        }
     };

    const signature = await getSignatureServiceDelete(endpointSgntr,accessToken,body);
     console.log("=======================")
     console.log(signature)
     console.log("=======================")
     console.log(accessToken)
     console.log("=======================")
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await deleteRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// console.log('transferVaDeleteVa')
// transferVaDeleteVa()

async function transferVaStatus(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transfer-va/status";
    let endpointSgntr = "/api/v1.0/transfer-va/status";

    let body = {
        "partnerServiceId":"  088899",
        "customerNo":12345678901234567890,
        "virtualAccountNo":"  08889912345678901234567890",
        "inquiryRequestId":"abcdef-123456-abcdef",
        "paymentRequestId":"abcdef-123456-abcdef",
        "additionalInfo":{
       
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// console.log('transferVaStatus')
 //transferVaStatus()

/**
 * =====================================================================================================
 * TRANSFER KREDIT
 * =====================================================================================================
 * CUSTOMER TOP UP
 * =====================================================================================================
 */

async function emoneYAccountInquiry(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/emoney/account-inquiry";
    let endpointSgntr = "/api/v1.0/emoney/account-inquiry";

    let body = {
        "partnerReferenceNo":" 2020102900000000000001",
        "customerNumber":"17081945",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "transactionDate":"2020-12-21T14:56:11+07:00",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// console.log('emoneYAccountInquiry');
 //emoneYAccountInquiry()

async function emoneyTopup(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/emoney/topup";
    let endpointSgntr = "/api/v1.0/emoney/topup";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "customerNumber":"17081945",
        "customerName":"John Doe",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "feeAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "transactionDate":"2020-12-21T17:01:11+07:00",
        "sessionId":"883737GHY8839",
        "categoryId":"6",
        "notes":"notes test",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// console.log('emoneyTopup');
 //emoneyTopup()

/** 
 * =========================================================================================== DEBIT
 * TRANSFER DEBIT
 * ===========================================================================================
 * DIRECT DEBIT
 * ==========================================================================================
 * */

async function paymentHostToHost(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/debit/payment-host-to-host";
    let endpointSgntr = "/api/v1.0/debit/payment-host-to-host";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "bankCardToken":"00007100010926",
        "chargeToken":"00007100010926",
        "otp":"12345678",
        "merchantId":"23489182303312",
        "terminalId":"489182303312",
        "journeyId":"861023713017210",
        "subMerchantId":"310928924949487",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "urlParam":[
           {
              "url":"https://test1.bi.go.id/v1/test",
              "type":"PAY_RETURN",
              "isDeeplink":"Y"
           },
           {
              "url":"https://test2.bi.go.id/v1/test",
              "type":"PAY_RETURN",
              "isDeeplink":"Y"
           }
        ],
        "externalStoreId":"239840198240795109",
        "validUpTo":"2020-12-23T07:44:11+07:00",
        "pointOfInitiation":"Mobile App",
        "feeType":"SHA|1000",
        "disabledPayMethods":"CREDIT_CARD",
        "payOptionDetails":[
           {
              "payMethod":"CREDIT_CARD",
              "payOption":"CREDIT_CARD_VISA",
              "transAmount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              },
              "feeAmount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              },
              "cardToken":"d89ca90ua90sd80as9809",
              "merchantToken":"a90ua90sd80d89cas9809",
              "additionalInfo":{
                 "deviceId":"12345679237",
                 "channel":"mobilephone"
              }
           },
           {
              "payMethod":"CREDIT_CARD",
              "payOption":"CREDIT_CARD_MASTER",
              "transAmount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              },
              "feeAmount":{
                 "value":"12345678.00",
                 "currency":"IDR"
              },
              "cardToken":"d89ca90ua90sd80as9809",
              "merchantToken":"a90ua90sd80d89cas9809",
              "additionalInfo":{
                 "deviceId":"12345679237",
                 "channel":"mobilephone"
              }
           }
        ],
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
 //paymentHostToHost()

async function status(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/debit/status";
    let endpointSgntr = "/api/v1.0/debit/status";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"30443786930722726463280097920912",
        "serviceCode":"17",
        "transactionDate":"2020-12-21T14:56:11+07:00",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "merchantId":"23489182303312",
        "subMerchantId":"23489182303312",
        "externalStoreId":"183908924912387",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//status()

async function notify(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/debit/notify";
    let endpointSgntr = "/api/v1.0/debit/notify";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"30443786930722726463280097920912",
        "merchantId":"23489182303312",
        "subMerchantId":"23489182303312",
        "amount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "latestTransactionStatus":"00",
        "transactionStatusDesc":"success",
        "createdTime":"2020-12-21T17:07:18+07:00",
        "finishedTime":"2020-12-21T17:07:20+07:00",
        "externalStoreId":"91863213913112",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//notify()

async function cancel(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/debit/cancel";
    let endpointSgntr = "/api/v1.0/debit/cancel";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "approvalCode":"201039000200",
        "originalExternalId":"30443786930722726463280097920912",
        "merchantId":"23489182303312",
        "subMerchantId":"23489182303312",
        "reason":"Network timeout",
        "externalStoreId":"124928924949487",
        "amount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
 //cancel()

async function refund(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/debit/refund";
    let endpointSgntr = "/api/v1.0/debit/refund";

    let body = {
        "merchantId":"00007100010926",
        "subMerchantId":"310928924949487",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "originalExternalId":"10052019",
        "partnerRefundNo":"239850918204981205970",
        "refundAmount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "externalStoreId":"124928924949487",
        "reason":"Customer complain",
        "additionalInfo":null
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//refund()

/** 
 * =========================================================================================== DEBIT
 * TRANSFER DEBIT
 * ===========================================================================================
 * AUTH PAYMENT
 * ==========================================================================================
 * */

async function authPayment(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/payment";
    let endpointSgntr = "/api/v1.0/auth/payment";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "amount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "mcc":"5743",
        "productCode":"293840918203",
        "title":"Ikan bakar bumbu kuning",
        "items":[
           {
              "goodsId":"908132",
              "price":{
                 "value":"10000.00",
                 "currency":"IDR"
              },
              "category":"food",
              "unit":"ekor",
              "quantity":"2"
           }
        ],
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
 //authPayment()

async function authQuery(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/query";
    let endpointSgntr = "/api/v1.0/auth/query";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "externalStoreId":"124928924949487",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// authQuery()

async function authCapture(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/capture";
    let endpointSgntr = "/api/v1.0/auth/capture";

    let body = {
        "originalReferenceNo":"2020102977770000000009",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "partnerCaptureNo":"0000710001012344",
        "captureAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "title":"Confirmed",
        "lastCapture":"TRUE",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     }
     ;

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// authCapture()

async function authCaptureQuery(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/capture-query";
    let endpointSgntr = "/api/v1.0/auth/capture-query";

    let body = {
        "originalReferenceNo":"2020102977770000000009",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "captureNo":"202010173821904898012234423",
        "partnerCaptureNo":"0000710001012344",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
 //authCaptureQuery()

async function authVoid(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/void";
    let endpointSgntr = "/api/v1.0/auth/void";

    let body = {
        "originalReferenceNo":"2020102977770000000009",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "voidAmount":{
           "value":"10000.00",
           "currency":"IDR"
        },
        "partnerVoidNo":"310928924945645",
        "voidRemainingAmount":"TRUE",
        "reason":"Shorter period/distance.",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     }
     ;

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//authVoid()

async function authVoidQuery(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/void-query";
    let endpointSgntr = "/api/v1.0/auth/void-query";

    let body = {
        "originalReferenceNo":"2020102977770000000009",
        "originalPartnerReferenceNo":"2020102900000000000001",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "voidNo":"202010173821904898012234423",
        "partnerVoidNo":"2020101738445452",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// authVoidQuery()

async function authRefund(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/auth/refund";
    let endpointSgntr = "/api/v1.0/auth/refund";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "originalReferenceNo":"2020102977770000000009",
        "partnerRefundNo":"239850918204981205970",
        "merchantId":"merch00001",
        "subMerchantId":"310928924949487",
        "originalCaptureNo":"202010173821904898012234423",
        "refundAmount":{
           "value":"12345678.00",
           "currency":"IDR"
        },
        "externalStoreId":"124928924949487",
        "reason":" Customer complain",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//authRefund()

/** 
 * ===========================================================================================
 * INFORMASI SALDO
 * ==========================================================================================
 * */

async function balanceInquiry(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/balance-inquiry";
    let endpointSgntr = "/api/v1.0/balance-inquiry";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "bankCardToken":"6d7963617264746f6b656e",
        "accountNo":"2000100101",
        "balanceTypes":[
           "Cash",
           "Coins"
        ],
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'MDR-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//balanceInquiry()

/** 
 * ===========================================================================================
 * RIWAYAT HISTORY
 * ==========================================================================================
 * */

async function transactionHistoryList(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/transaction-history-list";
    let endpointSgntr = "/api/v1.0/transaction-history-list";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "fromDateTime":"2019-07-03T12:08:56-07:00",
        "toDateTime":"2019-07-03T12:08:56-07:00",
        "pageSize":"10",
        "pageNumber":"1",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//transactionHistoryList()

async function transactionHistoryDetail(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = 'c4445d9c19334832abbe49bfdd73ecba';
    let endpoint = "v1.0/transaction-history-detail";
    let endpointSgntr = "/api/v1.0/transaction-history-detail";

    let body = {
        "originalPartnerReferenceNo":"2020102900000000000001",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-sNAP-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
// transactionHistoryDetail()

async function bankStatement(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/bank-statement";
    let endpointSgntr = "/api/v1.0/bank-statement";

    let body = {
   "partnerReferenceNo":"2020102900000000000001",
   "bankCardToken":"6d7963617264746f6b656e",
   "accountNo":"2000200202",
   "fromDateTime":"2019-07-03T12:08:56-07:00",
   "toDateTime":"2019-07-03T12:08:56-07:00",
   "additionalInfo":{
      "deviceId":"12345679237",
      "channel":"mobilephone"
   }
};

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'MDR-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"?",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//bankStatement()

/**
 * =====================================================================================================
 *                                             ACCOUNT INQUIRY
 * =====================================================================================================
 */

async function accountInquiryInternal(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/account-inquiry-internal";
    let endpointSgntr = "/api/v1.0/account-inquiry-internal";

    let body = {
        "partnerReferenceNo":"2020102900000000000001",
        "beneficiaryAccountNo":"2000100101",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,"",header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//accountInquiryInternal()

async function accountInquiryExternal(){
    var moment = require("moment");
    const accessToken = await getToken();
    const clientId = config.midtrans.clientId;
    let endpoint = "v1.0/account-inquiry-external";
    let endpointSgntr = "/api/v1.0/account-inquiry-external";

    let body = {
        "beneficiaryBankCode":"008",
        "beneficiaryAccountNo":"8000800808",
        "partnerReferenceNo":"2020102900000000000001",
        "additionalInfo":{
           "deviceId":"12345679237",
           "channel":"mobilephone"
        }
     };

    const signature = await getSignatureService(endpointSgntr,accessToken,body);
  
    let header = {
        "X-SIGNATURE":signature,
        "Authorization": 'Bearer '+accessToken,
        "X-PARTNER-ID":clientId,
        "X-EXTERNAL-ID": 'CMB-ASPI-'+moment().format('DDMMYYYYHHmmss'),
        "CHANNEL-ID": 95221,
    };

    try{
        var result = await createRequest(endpoint,body,header);
        if(result){
            console.log(result)
        }
    }catch(e){
        console.log(e)
    }
}
//accountInquiryExternal()