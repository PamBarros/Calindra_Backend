module.exports = {
    formatarEnd: (endereco) => {
        let map={
            "â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E",
            "è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I",
            "õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U",
            "û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"
        };
        return endereco.replace(/[\W\[\] ]/g,function(a){return map[a]||a}).replace(/\s/g, '+')    
    },

    calcularDis: (endereco1, endereco2) => {
        var deg2rad = function (deg) { return deg * (Math.PI / 180); },
            R = 6371,
            dLat = deg2rad(endereco2.lat - endereco1.lat),
            dLng = deg2rad(endereco2.lng - endereco1.lng),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(endereco1.lat))
                * Math.cos(deg2rad(endereco1.lat))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return ((R * c *1000).toFixed());
    },

    MetroEmKM: (metros) => (metros / 1000).toFixed(1)
}