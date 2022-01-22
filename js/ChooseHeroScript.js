let bodyTag = document.querySelector("body");
let heroInfoContainer = document.querySelectorAll(".heroInfoContainer");
let backgroundImage = document.querySelector("body .backgroundImage");
let attackButton = document.querySelector(".attackButtonContainer button");
let errorLabel = document.querySelector(".errorLabel");
let selectedAllyHero = null;
let selectedEnemyHero = null;

for ( let id = 0 ; id < heroInfoContainer.length ; id++ ) {
    heroInfoContainer[id].addEventListener("mouseenter", e => {
        let img = heroInfoContainer[id].querySelector(".imageContainer img").getAttribute("src");
        // bodyTag.setAttribute("style",
        // `background-image: url("${img}");
        // filter: grayscale(80%) blur(5px);`);
        backgroundImage.style.opacity="1";
        backgroundImage.setAttribute("src",`${img}`);
    });
    heroInfoContainer[id].addEventListener("mouseleave", e => {
        // backgroundImage.setAttribute("style","opacity: 0");
        backgroundImage.style.opacity="0";
        backgroundImage.removeAttribute("src");
        
    });
    heroInfoContainer[id].addEventListener("click", e => {
        for ( let count=0 ; count < heroInfoContainer.length ; count++ ) {
            if ( heroInfoContainer[count] == e.target ) {
                if ( count < 6  ) {
                    for ( let allyCount = 0 ; allyCount < 6 ; allyCount++ ) {
                        if ( heroInfoContainer[allyCount] == e.target ) {
                            heroInfoContainer[allyCount].classList.add("borderColorWhite");
                            selectedAllyHero=heroInfoContainer[allyCount].querySelector(".imageContainer img").getAttribute("src");
                        } else {
                            heroInfoContainer[allyCount].classList.remove("borderColorWhite");
                        }
                    }
                } else {
                    for ( let enemyCount = 6 ; enemyCount < 12 ; enemyCount++ ) {
                        if ( heroInfoContainer[enemyCount] == e.target ) {
                            heroInfoContainer[enemyCount].classList.add("borderColorWhite");
                            selectedEnemyHero=heroInfoContainer[enemyCount].querySelector(".imageContainer img").getAttribute("src");
                        } else {
                            heroInfoContainer[enemyCount].classList.remove("borderColorWhite");
                        }
                    }
                }
            } 
        }
    });
}


attackButton.addEventListener("click",e => {
    if ( selectedAllyHero === null || selectedEnemyHero === null ) {
        errorLabel.style.opacity = "1";
        return;
    }
    let fightCodes = `<div class="arenaTitle">Fighting Arena</div>
        <div class="arena_vs_style">
            <div class="ally">
                <img src="${selectedAllyHero}">
                <p class="health">Health: 100</p>
            </div>
            <p class="vs">VS</p>
            <div class="enemy">
                <img src="${selectedEnemyHero}">
                <p class="health">Health: 100</p>
            </div>
        </div>
        <div class="fightButtonContainer">
            <button onclick="fightAlgorithm()">Fight</button>
        </div>
        <div class="fightLabel">Fighting...</div>`;
    errorLabel.style.opacity="0";
    bodyTag.innerHTML = fightCodes;
});

let fightAlgorithm = (event) => {
    let playerHealth = 100;
    let enemyHealth = 100;
    let playerAttackPower = 0;
    let enemyAttackPower = 0;
    let winner = null;

    let getAllyHealth = document.querySelector(".ally .health");
    let getEnemyHealth = document.querySelector(".enemy .health");
    let getFightLabel = document.querySelector(".fightLabel");

    getFightLabel.style.opacity="1";
    while ( playerHealth !== 0 || enemyHealth !== 0 ) {
        playerAttackPower = Math.floor(Math.random()*5) + 1;
        enemyAttackPower = Math.floor(Math.random()*5) + 1;
        playerHealth -= enemyAttackPower;
        enemyHealth -= playerAttackPower;


        getAllyHealth.textContent = "Health: "+playerHealth;
        getEnemyHealth.textContent = "Health: "+enemyHealth;
        
        if ( playerHealth < 0 ) {
            playerHealth=0;
            if ( enemyHealth > 0 ) {
                winner="Enemy";
                break;
            }
        }
        if ( enemyHealth < 0 ) {
            enemyHealth=0;
            if ( playerHealth > 0 ) {
                winner="Ally";
                break;
            }
        }      
    }
    
    getFightLabel.textContent = winner + " is the winner";
    
};