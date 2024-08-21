/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from ("@google/generative-ai");

fetch(`https://api.example.com/data?api_key=${import.meta.env.VITE_GEMINI_API_KEY}`)
  .then(response => response.json())
  .then(data => console.log(data));
console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY);

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function run() {
  const parts = [
    {text: "input: beginner"},
    {text: "output: if you are a beginner start with easy words. see how you should place your fingers on the keyboard first, it's the most crucial part. and track your progress. don't worry I'll be here to assist."},
    {text: "input: intermediate"},
    {text: "output: if you are intermediate try using punctuations as you get better move to harder words."},
    {text: "input: advanced"},
    {text: "output: great. you know how to type fast. try harder words with punctuations to see how great you really are."},
    {text: "input: wpm 40 default easy"},
    {text: "output: not bad for a rookie. try getting to at least 60 wpm to move to medium words."},
    {text: "input: wpm 50 default easy"},
    {text: "output: nice progress. keep it going."},
    {text: "input: wpm 65 default easy"},
    {text: "output: wow great. try moving to harder words or using punctuation to progress even more."},
    {text: "input: WPM 20 default easy"},
    {text: "output: You're just getting started. Focus on accuracy over speed. Try to practice at least 10 minutes a day. You'll notice improvement soon!"},
    {text: "input: WPM 25 default easy"},
    {text: "output: Good start! Keep practicing easy words and try to maintain your accuracy. Consistency is key."},
    {text: "input: WPM 30 default medium"},
    {text: "output: you're making progress! Start incorporating some simple punctuation into your practice."},
    {text: "input: WPM 45 default easy"},
    {text: "output: Nice work! You're becoming more consistent. Try to challenge yourself with medium words and light punctuation."},
    {text: "input: WPM 55 default easy"},
    {text: "output: Impressive! You're getting the hang of it. Start practicing with more complex sentences and punctuation"},
    {text: "input: WPM 60 default medium"},
    {text: "output: Excellent! You’re ready to take on harder words. Push yourself with longer sessions and see how far you can go."},
    {text: "input: WPM 75 default easy"},
    {text: "output: Fantastic! You’ve got the speed. Now, test your accuracy with challenging punctuation and numbers."},
    {text: "input: WPM 85 default easy"},
    {text: "output: Incredible! You're a fast typer. Try increasing your focus on difficult word combinations and perfecting your punctuation usage."},
    {text: "input: WPM 95 default easy"},
    {text: "output: Amazing! You're nearing expert level. Try mastering the hardest words with varied punctuation and numbers."},
    {text: "input: wpm 55 punctuation easy"},
    {text: "output: nice. you're progressing in punctuation. stay consistent you'll get there."},
    {text: "input: wpm 50 punctuation medium"},
    {text: "output: you're crushing the medium words with punctuation. keep going."},
    {text: "input: wpm 20 punctuation hard"},
    {text: "output: maybe try medium or easy words before taking harder words"},
    {text: "input: wpm 35 punctuation hard"},
    {text: "output: getting high scores in hard mode isn't that easy. you should try medium words first."},
    {text: "input: wpm 30 default medium"},
    {text: "output: before moving to medium words you should try getting more progress on easy ones first!"},
    {text: "input: wpm 70 default medium"},
    {text: "output: wow! I think you might want to try punctuation you're pretty good by now."},
    {text: "input: wpm 90 default medium"},
    {text: "output: you've got some fast fingers! try moving to hard words or using punctuation."},
    {text: "input: wpm 35 numbers medium"},
    {text: "output: not bad! you can use numbers with easier words to get used to it before moving to medium words."},
    {text: "input: wpm 70 punctuation hard"},
    {text: "output: Excellent! keep pushing to be the fastest."},
    {text: "input: wpm 90 punctuation medium"},
    {text: "output: You've mastered it! now try hard words to see if they would be any challenge for you."},
    {text: "input: august 2023: 30, august 2024: 80"},
    {text: "output: in 1 year you've progressed so much. from 30 wpm to 80 wpm that's incredible."},
    {text: "input: 10 august 2023,  16 august 2024"},
    {text: "output: in three days you're already better than half of the world. from 40 wpm to 60 wpm in such a little time."},
    {text: "input: 10 march 2024: 30, 15 august 2024: 40"},
    {text: "output: you've made some progress. from 30 wpm to 40 wpm in 5 months. keep it up."},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
  });
  console.log(result.response.text());
}

export default run;