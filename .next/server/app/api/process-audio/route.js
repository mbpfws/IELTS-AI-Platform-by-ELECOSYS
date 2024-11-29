(()=>{var e={};e.id=592,e.ids=[592],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},8693:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>x,routeModule:()=>m,serverHooks:()=>v,workAsyncStorage:()=>h,workUnitAsyncStorage:()=>f});var s={};r.r(s),r.d(s,{POST:()=>g});var o=r(2706),n=r(8203),a=r(5994),i=r(9187);let c=new(r(6858)).ij(process.env.GEMINI_API_KEY||""),p={temperature:.75,topP:.95,topK:64,maxOutputTokens:12192},u=`You are a friendly and supportive IELTS Speaking Tutor. Your role is to:
1. First, acknowledge and encourage the student's efforts
2. Have a natural conversation about the topic
3. Gently point out 1-2 areas for improvement while highlighting what they did well
4. Provide specific examples and suggestions for practice
5. Ask follow-up questions to keep the conversation going

Remember to:
- Keep the tone conversational and supportive
- Focus on helping the student express themselves naturally
- Avoid overwhelming them with too many corrections
- Encourage them to expand their answers`;async function d(e){try{return"This is a placeholder transcription. In production, you would integrate with a speech-to-text service."}catch(e){throw console.error("Error processing audio to text:",e),Error("Failed to process audio to text")}}async function l(e){try{let t=JSON.parse(e),r="";if(r+="Thanks for sharing your thoughts! \uD83D\uDE0A\n\n",t.feedback){let{fluencyAndCoherence:e,lexicalResource:s,grammarAndAccuracy:o,pronunciation:n}=t.feedback;r+="Here's what you did well:\n• "+e.split(".")[0]+"\n• "+s.split(".")[0]+"\n\nLet's work on a couple of things to make your answer even better:\n",t.improvements&&t.improvements.length>0&&t.improvements.slice(0,2).forEach(e=>{r+="• "+e.replace(/\*\*[^*]+\*\*/g,"").trim()+"\n"}),r+="\nLet's practice more! Could you tell me more about...?\n"}return r}catch(t){return console.error("Error formatting tutor response:",t),e}}async function g(e){try{let t;if(!process.env.GEMINI_API_KEY)return i.NextResponse.json({success:!1,error:"GEMINI_API_KEY is not set"},{status:500});if((e.headers.get("content-type")||"").includes("multipart/form-data")){let t;let r=await e.formData(),s=r.get("audio"),o=r.get("sessionData");if(!s||!o)return i.NextResponse.json({success:!1,error:"Missing audio or session data"},{status:400});try{t=JSON.parse(o)}catch(e){return i.NextResponse.json({success:!1,error:"Invalid session data format"},{status:400})}let n=await d(s),a=c.getGenerativeModel({model:"gemini-pro",generationConfig:p}),l=`${u}

Topic: ${t.topic.title}
Description: ${t.topic.description}
Target Band Score: ${t.topic.targetBand}

Student's response: ${n}

Please provide:
1. A natural, encouraging response to continue the conversation
2. A gentle correction of any major errors (if present)
3. A follow-up question to keep the discussion going

Format your response in a conversational way, focusing on keeping the student engaged.`,g=(await a.generateContent(l)).response.text();return i.NextResponse.json({success:!0,transcription:n,response:g},{status:200})}{let r;try{t=await e.json()}catch(e){return console.error("Error parsing JSON request body:",e),i.NextResponse.json({success:!1,error:"Invalid JSON format"},{status:400})}if(t.isSessionStart)try{let{sessionData:e}=t;if(!e||!e.topic)return i.NextResponse.json({success:!1,error:"Invalid session data"},{status:400});let r=c.getGenerativeModel({model:"gemini-pro"}),s=`You are a friendly IELTS Speaking tutor. The student wants to practice ${e.topic.title} for ${Math.floor(e.duration/60)} minutes.
        
Topic description: ${e.topic.description}

Generate a welcoming message that:
1. Introduces yourself as their tutor
2. Explains what they'll be practicing
3. Sets a comfortable, encouraging tone
4. Asks a specific opening question about the topic to start the conversation

${e.topic.systemPrompt||""}`,o=(await r.generateContent(s)).response.text();if(!o)throw Error("No response from AI model");return i.NextResponse.json({success:!0,response:o},{status:200})}catch(e){return console.error("Error in session initialization:",e),i.NextResponse.json({success:!1,error:"Failed to initialize session",details:e instanceof Error?e.message:"Unknown error"},{status:500})}if(t.message){let{message:e,sessionData:r}=t,s=c.getGenerativeModel({model:"gemini-pro",generationConfig:p}),o=`${u}

Topic: ${r.topic.title}
Description: ${r.topic.description}
Target Band Score: ${r.topic.targetBand}

Student's message: ${e}

Please provide a natural, conversational response that:
1. Acknowledges their input
2. Provides gentle feedback if needed
3. Asks a relevant follow-up question`,n=(await s.generateContent(o)).response.text();return i.NextResponse.json({success:!0,response:n},{status:200})}let{transcription:s,sessionData:o}=t;if(!o)return i.NextResponse.json({success:!1,error:"No session data provided"},{status:400});if(!s)return i.NextResponse.json({success:!1,error:"No transcription provided"},{status:400});try{r="string"==typeof o?JSON.parse(o):o}catch(e){return i.NextResponse.json({success:!1,error:"Invalid session data format"},{status:400})}let{topic:n}=r;if(!n||!n.title)return i.NextResponse.json({success:!1,error:"Invalid topic data"},{status:400});let a=c.getGenerativeModel({model:"gemini-pro",generationConfig:p}),d=`${u}

Topic: ${n.title}
Description: ${n.description}
Target Band Score: ${n.targetBand}

Student's response: ${s}

Please analyze the response and provide:
1. A band score (0-9) for this response
2. Detailed feedback on:
   - Fluency and coherence
   - Lexical resource
   - Grammatical range and accuracy
   - Pronunciation
3. Specific examples from the response to support your feedback
4. Suggestions for improvement

Format your response in JSON:
{
  "bandScore": number,
  "feedback": {
    "fluencyAndCoherence": string,
    "lexicalResource": string,
    "grammarAndAccuracy": string,
    "pronunciation": string
  },
  "improvements": [string]
}`,g=(await a.generateContent(d)).response.text(),m=await l(g);return i.NextResponse.json({success:!0,response:m,rawAnalysis:g},{status:200})}}catch(e){return console.error("Unexpected error in process-audio route:",e),i.NextResponse.json({success:!1,error:"Unexpected server error",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}let m=new o.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/process-audio/route",pathname:"/api/process-audio",filename:"route",bundlePath:"app/api/process-audio/route"},resolvedPagePath:"e:\\STAND ALONE APP\\src\\app\\api\\process-audio\\route.ts",nextConfigOutput:"standalone",userland:s}),{workAsyncStorage:h,workUnitAsyncStorage:f,serverHooks:v}=m;function x(){return(0,a.patchFetch)({workAsyncStorage:h,workUnitAsyncStorage:f})}},6487:()=>{},8335:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[989,452,858],()=>r(8693));module.exports=s})();