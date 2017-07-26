module.exports = {
    database: {
        //name:'mongodb://localhost/pire-to-pire',
        defaultAddress:{
            prefix:'mongodb',
            name:'localhost',
            database:'api-hervegame'
        },
        collections : {
            rooms: 'room',
            
        },
		verbose:true,
		mongooseDebug:false,
		salt:'s84*--+489efHEiuhdUU'
    },
    server:{
        port:3000
    },
}
