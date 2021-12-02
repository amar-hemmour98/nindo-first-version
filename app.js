const express = require ('express');
const bodyParser = require ('body-parser');
const e = require('express');
const app = express ();

var cryptedArray =[];
var nindo;
var cryptedNindo ="" ; 
const alph = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","'"]

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");    
});
app.listen(3005,function(){
    console.log("listenning on port 3005");
});

app.post('/',function(req,res){


    nindo = req.body.nindo;
    // const myArr = nindo.split(" ");
    // console.log (myArr);
    fiboCrypt(nindo);
});

function fiboDecrypt(str){
    var decryptedNindo ="";
    const nindoArray = str.split("~");
    // a changer !!! uniquement pour tests /
    nindoArray.pop();
    // console.log("nindoArray "+nindoArray);
    for (var i=0;i<nindoArray.length;i++){
        var word = nindoArray[i].split("&");
        word.pop();
        // console.log("word "+word);
        for(var j=0;j<word.length;j++){
            decryptedNindo += reversacci(word[j]);
        }
        decryptedNindo+=" ";
        // console.log("word is "+word);
        

    }
    console.log("decryptedNindo is "+ decryptedNindo);
    return decryptedNindo;
}

function fiboCrypt(nindo){
    const nindoArray = nindo.split(" ");
    var str ="";
    for (var i =0;i<nindoArray.length;i++){
        str="";
        const nindoWord = nindoArray[i].split("");
        for (var j = 0;j<nindoWord.length;j++){
            for (var k = 0;k<alph.length;k++){
                if (alph[k]==nindoWord[j]){
                    // console.log(alph[k]+" est "+nindoWord[j]);
                    // console.log("le fibo de "+k+" est: "+fibo(k));
                    str += fibo(k);
                    str +="&";

                }
            }

        }cryptedArray.push(str);

    }


    for (var i = 0;i<cryptedArray.length;i++){
    cryptedNindo+=cryptedArray[i];
    cryptedNindo+="~";    
    }

    // console.log(cryptedArray);
     console.log("clear message : "+nindo);
     console.log("crypted message :"+cryptedNindo);
    // console.log("decrypted nindo is :"+fiboDecrypt(cryptedNindo));
}

function fibo(k){
    var n1 = 0 ; 
    var n2 = 1 ; 
    var sum = 0 ;
    if (k==1){
        return 4 ; 
    }

    for (let i = 2 ;i<= k ;i++){
        sum = n1 +n2 ; 
        n1 = n2 ; 
        n2 = sum;
    }
    return k ? n2 :n1 ; 
}

function reversacci(k){
    if (k==4){
        return alph[1];
    }else if (k==1){
        return alph[2] ; 
    }else if (k==0){
        return alph[0] ;
    }

    var a=0,b=1,c=1;
    var res = 1 ; 
    while (c<k){
        c = a+b;
        res++;
        a=b;
        b=c;
    }
    return alph[res] ; 

}

