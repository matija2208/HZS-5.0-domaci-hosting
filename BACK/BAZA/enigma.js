class Reflektor
{
    constructor(a)
    {
        this.a=a;
    }

    get A()
    {
        return this.a;
    }

    reflektuj(p)
    {
        let q=p;
        p=this.a[q];
        return p;
    }
}

class Rotor
{
    constructor(a,b)
    {
        this.ulaz=a;
        this.izlaz=b;
    }

    ulazna_strana(m,p)
    {
        let max=95;
        let q=p+(m-1);

        if (q > max && q % max != 0)
        {
            q -= (Math.floor(q / max) * max);
        }
        else if (q % max === 0)
        {
            q = max;
        }
        p = this.ulaz[q] - (m - 1);
        while (p < 1)
        {
            p += max;
        }
        return p;
    }

    izlazna_strana(m,p)
    {
        let max=95;
        let q=(Number)(p+(m-1));
        //console.log("  ",q);
        if (q > max && q % max != 0)
        {
            q -= (Math.floor(q / max) * max);
        }
        else if (q % max === 0)
        {
            q = max;
        }
        //console.log("  ",q);
        p = this.izlaz[q] - (m - 1);
        while (p < 1)
        {
            p += max;
        }
        return p;
    }
}

function main(x)
{
    let control = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()`~-_=+[{]};:\047\042\\|,<.>/? ";
    let output = "";
    let rotors=[Rotor];
    rotors[0]=new Rotor([32, 60, 77, 17, 1, 62, 64, 9, 53, 81, 51, 92, 80, 20, 57, 90, 73, 40, 32, 70, 7, 86, 49, 36, 83, 94, 95, 21, 5, 37, 67, 59, 55, 14, 27, 6, 13, 3, 56, 25, 35, 88, 85, 89, 34, 48, 26, 84, 22, 12, 39, 71, 11, 93, 78, 38, 4, 82, 76, 63, 42, 69, 2, 46, 18, 72, 79, 30, 50, 23, 61, 47, 87, 58, 33, 74, 44, 29, 41, 43, 45, 65, 16, 91, 75, 19, 28, 54, 8, 66, 68, 52, 31, 24, 15, 10],[32, 4, 62, 37, 56, 28, 35, 20, 88, 7, 95, 52, 49, 36, 33, 94, 82, 3, 64, 85, 13, 27, 48, 69, 93, 39, 46, 34, 86, 77, 67, 92, 18, 74, 44, 40, 23, 29, 55, 50, 17, 78, 60, 79, 76, 80, 63, 71, 45, 22, 68, 10, 91, 8, 87, 32, 38, 14, 73, 31, 1, 70, 5, 59, 6, 81, 89, 30, 90, 61, 19, 51, 65, 16, 75, 84, 58, 2, 54, 66, 12, 9, 57, 24, 47, 42, 21, 72, 41, 43, 15, 83, 11, 53, 25, 26]);
    rotors[1]=new Rotor([32, 82, 5, 74, 20, 8, 84, 76, 3, 21, 43, 13, 48, 23, 91, 31, 42, 50, 22, 4, 19, 37, 68, 26, 9, 61, 45, 51, 18, 33, 10, 79, 49, 44, 36, 92, 70, 54, 78, 41, 75, 7, 94, 53, 69, 12, 14, 2, 57, 73, 77, 85, 29, 80, 56, 52, 63, 1, 30, 62, 60, 86, 24, 15, 67, 81, 34, 95, 16, 17, 88, 38, 40, 72, 47, 71, 65, 55, 11, 89, 59, 6, 32, 58, 27, 46, 66, 35, 28, 90, 25, 83, 87, 39, 64, 93],[32, 57, 47, 8, 19, 2, 81, 41, 5, 24, 30, 78, 45, 11, 46, 63, 68, 69, 28, 20, 4, 9, 18, 13, 62, 90, 23, 84, 88, 52, 58, 15, 82, 29, 66, 87, 34, 21, 71, 93, 72, 39, 16, 10, 33, 26, 85, 74, 12, 32, 17, 27, 55, 43, 37, 77, 54, 48, 83, 80, 60, 25, 59, 56, 94, 76, 86, 64, 22, 44, 36, 75, 73, 49, 3, 40, 7, 50, 38, 31, 53, 65, 1, 91, 6, 51, 61, 92, 70, 79, 89, 14, 35, 95, 42, 67]);
    rotors[2]=new Rotor([32, 91, 45, 50, 20, 16, 22, 93, 64, 79, 63, 92, 41, 4, 33, 65, 26, 85, 54, 34, 17, 72, 82, 46, 12, 25, 13, 21, 6, 61, 24, 59, 81, 32, 49, 89, 78, 95, 75, 87, 80, 48, 29, 5, 77, 1, 90, 2, 35, 43, 27, 83, 36, 51, 94, 28, 11, 9, 84, 7, 18, 44, 57, 10, 15, 55, 69, 39, 56, 52, 8, 62, 42, 66, 14, 60, 86, 74, 30, 68, 40, 73, 67, 76, 71, 88, 58, 47, 31, 23, 38, 70, 53, 3, 37, 19],[32, 45, 47, 93, 13, 43, 28, 59, 70, 57, 63, 56, 24, 26, 74, 64, 5, 20, 60, 95, 4, 27, 6, 89, 30, 25, 16, 50, 55, 42, 78, 88, 33, 14, 19, 48, 52, 94, 90, 67, 80, 12, 72, 49, 61, 2, 23, 87, 41, 34, 3, 53, 69, 92, 18, 65, 68, 62, 86, 31, 75, 29, 71, 10, 8, 15, 73, 82, 79, 66, 91, 84, 21, 81, 77, 38, 83, 44, 36, 9, 40, 32, 22, 51, 58, 17, 76, 39, 85, 35, 46, 1, 11, 7, 54, 37]);

    let reflektor = new Reflektor([32, 25, 28, 85, 32, 44, 37, 17, 72, 41, 40, 26, 68, 48, 83, 34, 94, 7, 89, 63, 88, 52, 35, 69, 60, 1, 11, 27, 2, 66, 82, 54, 4, 95, 15, 22, 45, 6, 84, 73, 10, 9, 61, 90, 5, 36, 53, 50, 13, 51, 47, 49, 21, 46, 31, 56, 55, 75, 91, 64, 24, 42, 76, 19, 59, 74, 29, 71, 12, 23, 81, 67, 8, 39, 65, 57, 62, 92, 86, 80, 79, 70, 30, 14, 38, 3, 78, 93, 20, 18, 43, 58, 77, 87, 16, 33]);

    let i=1;
    let j=1;
    let k=1;

    let max = 95;
    
    for(let p = 0;p<x.length;p++)
    {
        //console.log(x[p]);
        if (i == 50)
		{
            j += 1;
        }
		else if (i == max)
		{
            i = 1;
        }

		if (j == 50)
		{	
            k += 1;
        }
		else if (j == max)
		{
        	j = 1;
        }

		if (k == max)
		{	
            k = 1;
        }   

        let c = x[p];

        for (let o = 1; o < control.length; o++)
        {
            if (c === control[o])
            {
                c = o;
                break;
            }
        }
        //console.log(" ",c);
        c = rotors[0].ulazna_strana(i, c);
        //console.log(" ",c);
        c = rotors[1].ulazna_strana(j, c);
        //console.log(" ",c);
        c = rotors[2].ulazna_strana(k, c);
        //console.log(" ",c);
        c = reflektor.reflektuj(c);
        //console.log(" ",c);
        c = rotors[2].izlazna_strana(k, c);
        //console.log(" ",c);
        c = rotors[1].izlazna_strana(j, c);
        //console.log(" ",c, " ", i);
        c = rotors[0].izlazna_strana(i, c);
        //console.log(c);
        output+=control[c];

        i+=1;
    };

    return output;
}

module.exports=main;