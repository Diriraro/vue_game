let vm =  new Vue({
    el: '#app',
    data : {
        count : 3,
        selectKey : '',
        playerImg : './images/question.jpg',
        playerHrt: 3,
        cpuKey : '',
        cpuImg : './images/question.jpg',
        cpuHrt : 3,
        thinking: '생각중...',
        waitLog: false,
        fightLog :[],
        playerHrtImg : ['./images/heart.jpg', './images/heart.jpg', './images/heart.jpg'],
        cpuHrtImg : ['./images/heart.jpg', './images/heart.jpg', './images/heart.jpg'],
    },
    methods:{
        wating:function(){
            if(this.selectKey == ''){
                alert("선택 후 버튼을 눌러주세요.");
                return;
            }else if(this.playerHrt == 0 || this.cpuHrt == 0){
                alert("게임이 종료되었습니다.");
                return;
            }
            this.cpuKey = '';
            this.thinking = '생각중...';
            this.waitLog = true;
            setTimeout(this.counting, 1000);
        },
        counting:function(){
            this.count --;
            if(this.count != 0){
                this.wating();
            }else{
                this.confirmSelect();
            }
        },
        confirmSelect:function(){
            let ftlogs = '';
            let cpuWhat = Math.floor(Math.random() * 3) + 1;

            if(cpuWhat === 1){
                this.cpuKey = "rock";
                this.thinking = "바위!";
               ftlogs = this.fight(this.selectKey, this.cpuKey);
            }else if(cpuWhat === 2){
                this.cpuKey = "scissor";
                this.thinking = "가위!";
                ftlogs = this.fight(this.selectKey, this.cpuKey);
            }else{
                this.cpuKey = "paper";
                this.thinking = "보!";
                ftlogs = this.fight(this.selectKey, this.cpuKey);
            }
            this.fightLog.unshift(ftlogs);
           this.waitLog =false;
        },
        fight:function(you , cps){
            let ftlog = '';
            if(you === cps){
                this.resultLog = '비겼습니다.';
                ftlog = `YOU : ${you} | Computer : ${cps} ==> DRAW !!`;
            }else if((you == 'scissor' && cps == 'rock') || (you == 'rock' && cps == 'paper') || (you == 'paper' && cps == 'scissor')){
                this.resultLog = '졌습니다..';
                ftlog = `YOU : ${you} | Computer : ${cps} ==> YOU LOSE !!`; 
                this.playerHrt --;
                setTimeout(this.resultGame, 2000);
            }else{
                this.resultLog = '이겼습니다!';
                ftlog = `YOU : ${you} | Computer : ${cps} ==> YOU WIN !!`;
                this.cpuHrt --;
                setTimeout(this.resultGame, 2000);
            }
            return ftlog;
        },
        resultGame: function(){
            if(this.cpuHrt == 0){
                alert("승리하였습니다.");
                window.location.reload();
            }else if(this.playerHrt == 0){
                alert("패배하였습니다.");
                window.location.reload();
            }else{
                return;
            }
        }
    },
    watch:{
        selectKey: function(changeKey){
            this.playerImg = `./images/${changeKey}.jpg`;
        },
        cpuKey: function(changeKey){
            if(changeKey != ''){
                this.cpuImg = `./images/${changeKey}.jpg`;
            }else{
                this.cpuImg = './images/question.jpg';
            }
        },
        count:function(newCount){
            if(newCount === 0){
                this.count = 3;
            }
        },
        playerHrt:function(newHrt){
            this.playerHrtImg[newHrt] = './images/broken-heart.jpg';
        },
        cpuHrt:function(newHrt){
            this.cpuHrtImg[newHrt] = './images/broken-heart.jpg';
        }
    },
   
})