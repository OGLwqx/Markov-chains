// Settings

const fixedMinLength = 3; // Minimal length which used in random-length phrase generation
const fixedMaxLength = 15; // Maximal length, similar to fixedMinLength

// System Functions

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function tokenize(input) {
    const result = []
    
    input.forEach(string => {
        result.push(string.split(' '))
    });
    return result;
}

function generatePairs(input) {
    const result = []
    const points = []

    input.forEach(arr => {
        arr.forEach((word, index) => {
            if(!arr[index+1]) return;
            result.push([word, arr[index+1]])
        })
    })

    result.forEach((arr, index) => {
        points.push({word: arr[0], index: index, length: arr[1].length})
    })

    return {result: result, points: points};
}

function getRandomWord(input) {
    const randomStroke = input[getRandomInRange(0, input.length-1)].split(' ')
    return randomStroke[getRandomInRange(0,randomStroke.length-1)]
}

function generate(firstWord, input, maxLen = fixedMaxLength, minLen = fixedMinLength) {
    if(!firstWord) {
        firstWord = getRandomWord(input)
    }

    if(maxLen != fixedMaxLength && minLen == fixedMinLength) {
        minLen = maxLen
    }

    let result = firstWord
    let prevWord = firstWord

    const pairs = generatePairs(tokenize(input))

    for (let i = 0; i < maxLen; i++) {
        let eligible = []
        pairs.points.forEach(obj => {
            if(obj.word === prevWord) {
                eligible.push(obj)
            }
        })
        if(eligible.length != 0) {
            const random = eligible[getRandomInRange(0, eligible.length-1)]
            const randomWord = pairs.result[random.index][1]
            prevWord = randomWord
            result += ` ${randomWord}`  
        } else {
            if(result.split(' ').length < minLen) {
                const random = getRandomWord(input)
                result += ` ${random}`
                prevWord = random
            }
        }
    }
    
    let lastWord = result.split(' ')
    lastWord = lastWord[lastWord.length-1]
    
    if(lastWord?.length < 2) {
        console.log(lastWord, lastWord.length)
        eligible = []
        pairs.points.forEach(obj => {
            if(obj.word === lastWord && obj.length > 2) {
                eligible.push(obj)
            }
        })
        if(eligible.length != 0) {
            const random = eligible[getRandomInRange(0, eligible.length-1)]
            const randomWord = pairs.result[random.index][1]
            result += ` ${randomWord}` 
        }
    }

    return result;

}

module.exports = generate

