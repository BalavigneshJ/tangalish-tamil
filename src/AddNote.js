import React from 'react'
import Textarea from './textarea/Textarea';
import draftToHtml from 'draftjs-to-html';


class AddNote extends React.Component {

    constructor(props) {
        super(props);
        this.getNote = this.getNote.bind(this);
    }

    getNote(val){
        let blocks = val.blocks ;
        blocks.map((b,i) => {
            b.text = this.getTamilWord(b.text);
        });

        let tamil = draftToHtml(val);
        document.querySelector(".tamil-text").innerHTML = tamil ;
    }

    getTamilWord(word){
        let letters = this.getTamilLetters(word) ;
        let map = this.getTamilMap() ;
        let vowel = this.getVowel() ;
        let tamilWord = "" ;
        for(let i = 0 ; i < letters.length ; i++){
            let l = letters[i].split("") ;
            let mapMainLetter = "" ;
            let mapAddonLetter = "" ;
            for(let j=0 ; j < l.length ;j++){
                if(vowel.indexOf(l[j]) !== -1){
                    //vowel
                    mapAddonLetter = mapAddonLetter+l[j] ;
                }else{
                    //not vowel
                    if(l[j].indexOf(" ") === -1){
                        mapMainLetter = mapMainLetter + l[j] ;
                    }
                }
            }

            if(mapMainLetter.length && mapAddonLetter.length){
                let mainLetter = map.main[mapMainLetter+"a"] ;
                if(mapAddonLetter.length === 1 && mapAddonLetter[0] === "a"){
                    tamilWord = tamilWord + String.fromCharCode(Array.isArray(mainLetter) ? mainLetter[0] : mainLetter ) ;
                }else{
                    tamilWord = tamilWord + String.fromCharCode(Array.isArray(mainLetter) ? mainLetter[0] : mainLetter  , map.addon[mapAddonLetter]);
                }
            }else if(mapMainLetter.length){
                let mainLetter = map.main[mapMainLetter+"a"] ;
                tamilWord = tamilWord + String.fromCharCode(Array.isArray(mainLetter) ? mainLetter[0] : mainLetter  , 3021);
            }else if(mapAddonLetter.length){
                tamilWord = tamilWord + String.fromCharCode(map.main[mapAddonLetter]);
            }else{
                tamilWord = tamilWord + " "
            }
        }

        return tamilWord ;
    }

    getVowel(){
        return "aeiou" ;
    }

    getTamilLetters(word){
        let w = word.split("");
        let vowel = this.getVowel() ;
        let connection  = "h"
        let letter = [] ;
        let t = "" ;
        let prev = "" ;

        //v,a,n,a,k,k,a,m 
        for(let i = 0 ; i < w.length ; i++){
            if(vowel.indexOf(w[i]) !== -1){
                //vowel
                if(vowel.indexOf(prev) !== -1 ){
                    //vowel
                    t = t+w[i];
                }else{
                    t = t+w[i];
                    //not vowel
                }
            }else{
                //not vowel
                if(t.length){
                    if(connection.indexOf(w[i]) !== -1){
                        t = t+w[i];
                    }else{
                        letter.push(t);
                        t = ""+ w[i] ;
                    }
                }else{
                    t = t+w[i];
                }
            }
            prev = w[i] ;
        }

        letter.push(t);
        return letter ;
    }

    getTamilMap(){
        // 2947-->ஃ      2949-->அ    2950-->ஆ
        // 2951-->இ      2952-->ஈ    2953-->உ
        // 2954-->ஊ      2958-->எ    2959-->ஏ
        // 2960-->ஐ      2962-->ஒ    2963-->ஓ   2964-->ஔ

        // 2965-->க    2969-->ங    2970-->ச    2974-->ஞ
        // 2975-->ட    2979-->ண    2980-->த    2984-->ந
        // 2985-->ன    2986-->ப    2990-->ம    2991-->ய
        // 2992-->ர    2993-->ற    2994-->ல    2995-->ள
        // 2996-->ழ    2997-->வ

        // 2972-->ஜ    2999-->ஷ    3000-->ஸ    3001-->ஹ

        // 3006-->ா  3007-->ி   3008-->ீ   3009-->ு  3010-->ூ

        // 3014-->ெ  3015-->ே  3016-->ை

        // 3018-->ொ  3019-->ோ  3020-->ௌ 3021-->்

        return { main : {"a":2949,"aa":2950,"e":2951,"i":2951,"ee":2952,"ii":2952,"u":2953,"uu":2954,
                 "ye":2958,"ae":2959,"ai":2960,"o":2962,"oo":2963,"aw":2964,

                 "ka":2965, "ga":2965, "nga":2969 , "cha":2970, "sa":2970 ,"nya":2974, "ta":2975 , "da":2975,
                 "na":2985 , "Na":2979, "nha":2969 , "Nha":2984, "tha":2980 , "dha":2980, "pa":2986,"ba":2986, "ma":2990, "ya":2991 ,
                 "ra":2992, "Ra":2993 , "la":2994, "La":2995 , "zha":2996, "va":2997 , "wa":2997,
                 "ja" :2972 , "sha":2999, "Sha":3000 , "ha":3001 },
                 addon : {"aa":3006 ,"i":3007,"ii":3008,"u":3009,"uu":3010,
                 "e":3014,"ee":3015,"ai":3016,"o":3018,"oo":3019,"aw":3021 , "ow":3021}
               }
    }
  
    
    getBaseText(){
        return {
              "blocks":[
                {
                "data": {},
                "depth": 0,
                "entityRanges": [],
                "inlineStyleRanges": [],
                "key": "9b1v0",
                "text": "Vanakkam"
                }
              ],
              entityMap:{}
            }
    }

    render() {

        return(
            <div className="note-book">  
               <div className="tamil-guide">
               na->ன  Na->ண nha->ங  Nha->ந
               ra->ர   Ra->ற 
               la->ல  La->ள  zha->ழ
               sha->ஷ  Sha->ஸ
                </div>  
               <div className="note-content"> 
                    <Textarea sendNote={this.getNote}/> 
               </div>
               <div className="note-tamil tamil-text"></div>  
               
            </div>
        );
    }
}



export default AddNote ;
