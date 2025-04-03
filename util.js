function getRandomValues(array){
    const randomElement =array[Math.floor(Math.random()*array.length)];
    return randomElement;
}
function doSomeHeavyWork(){
    const ms= getRandomValues([100,150,200,250,300,450,700,900,1200,1300,1700]);
    const shouldThrowError= getRandomValues([1,2,3,4,5,6,7,8])===8;
    if(shouldThrowError){
        const randomError =getRandomValues([
            "DB Payment Failure",
            "DB Server is Down",
            "Access Denied",
            "Not Found Error"
        ]);
        throw new Error(randomError);
    }
    return new Promise((resolve,reject)=>setTimeout(()=>resolve(ms),ms))
}

module.exports={doSomeHeavyWork};