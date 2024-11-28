(()=>{var e={};e.id=253,e.ids=[253],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},311:(e,t,s)=>{"use strict";s.r(t),s.d(t,{patchFetch:()=>f,routeModule:()=>d,serverHooks:()=>h,workAsyncStorage:()=>m,workUnitAsyncStorage:()=>g});var r={};s.r(r),s.d(r,{POST:()=>p});var n=s(2706),a=s(8203),o=s(5994),i=s(9187),c=s(5600);let u=`You are an IELTS Speaking Tutor. Your behavior should follow these strict rules:

1. CONVERSATION MODE (Default)
   - Act as a natural conversation partner
   - DO NOT provide any scoring or feedback during the conversation
   - Focus on asking questions and follow-up questions
   - Respond naturally to user's answers
   - Keep track of time internally but don't mention it
   - Only switch to evaluation mode when receiving the specific command

2. EVALUATION MODE (Only when triggered)
   - Triggered by: "The session of [X] minute practice has finished please give feedback in json"
   - Provide comprehensive evaluation in JSON format:
   {
     "scores": {
       "pronunciation": number, // 0-9 scale
       "grammar": number,
       "vocabulary": number,
       "fluency": number,
       "coherence": number
     },
     "feedback": {
       "strengths": string[],
       "improvements": string[],
       "tips": string[]
     }
   }

3. MOCK TEST MODE
   - When user selects mock test mode
   - Follow strict IELTS test format
   - Provide immediate scoring after each part
   - Use formal examination language

4. TOPIC HANDLING
   Part 1: Simple, direct questions about familiar topics
   Part 2: Cue card topics with 1-minute preparation, 2-minute speech
   Part 3: Abstract questions related to Part 2 topic

Remember: Stay in conversation mode until explicitly triggered for evaluation.`;async function l(e,t=0){try{let t=await fetch("https://api.learnlm.xyz/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.LEARNLM_API_KEY}`},body:JSON.stringify({model:"learnlm-1.5-pro-experimental",messages:e,temperature:.7,max_tokens:1e3})});if(!t.ok)throw Error("AI API request failed");return t.json()}catch(s){if(t<3)return await new Promise(e=>setTimeout(e,1e3)),l(e,t+1);throw s}}async function p(e){try{let{message:t,sessionId:s,duration:r,mode:n="practice"}=await e.json(),a=s?await c.z.speakingSession.findUnique({where:{id:s},include:{messages:!0}}):await c.z.speakingSession.create({data:{duration:r||0,userId:"default"},include:{messages:!0}});if(!a)throw Error("Session not found");let o="system"===t.role&&t.content.includes("has finished please give feedback in json"),p=[{role:"system",content:u}];if(a.messages){let e=a.messages.slice(-5).map(e=>({role:e.role,content:e.content}));p.push(...e)}t.audioUrl?p.push({role:"user",content:"Audio response received"}):p.push({role:"user",content:t.content});let d=await l(p);await c.z.speakingMessage.create({data:{content:t.content||"Audio message sent",role:"user",sessionId:a.id,responseTime:0,wordCount:t.content?t.content.split(" ").length:0}}),await c.z.speakingMessage.create({data:{content:d.choices[0].message.content,role:"assistant",sessionId:a.id}});let m=null;if(o)try{let e=d.choices[0].message.content.match(/\{[\s\S]*\}/);e&&(m=JSON.parse(e[0]))&&m.scores&&await c.z.speakingMetrics.create({data:{sessionId:a.id,pronunciation:m.scores.pronunciation,grammar:m.scores.grammar,vocabulary:m.scores.vocabulary,fluency:m.scores.fluency,coherence:m.scores.coherence,averageResponseTime:0,totalMessages:a.messages.length,uniqueWords:0}})}catch(e){console.log("Metrics parsing error:",e)}return i.NextResponse.json({message:{role:"assistant",content:d.choices[0].message.content},metrics:m,sessionId:a.id})}catch(e){return console.error("Chat API Error:",e),i.NextResponse.json({error:"Failed to process request"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/speaking/chat/route",pathname:"/api/speaking/chat",filename:"route",bundlePath:"app/api/speaking/chat/route"},resolvedPagePath:"e:\\STAND ALONE APP\\src\\app\\api\\speaking\\chat\\route.ts",nextConfigOutput:"",userland:r}),{workAsyncStorage:m,workUnitAsyncStorage:g,serverHooks:h}=d;function f(){return(0,o.patchFetch)({workAsyncStorage:m,workUnitAsyncStorage:g})}},6487:()=>{},8335:()=>{},5600:(e,t,s)=>{"use strict";s.d(t,{z:()=>n});let r=require("@prisma/client"),n=global.prisma||new r.PrismaClient({log:["query"]})}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[989,452],()=>s(311));module.exports=r})();