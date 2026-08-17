/* ==========================================================================
   NEXORA — shared static data used across pages
   ========================================================================== */

const NEXORA_DATA = {
  services: [
    { id:"web-development", icon:"code", title:"Web Development", cat:"Web", desc:"Modern, high-performance websites and web applications built for speed, scale and conversion.", tech:["React","Next.js","Node.js","TypeScript"] },
    { id:"mobile-app-development", icon:"mobile", title:"Mobile App Development", cat:"Mobile", desc:"Native-feel Android and iOS applications with polished UX and rock-solid performance.", tech:["React Native","Swift","Kotlin","Flutter"] },
    { id:"software-development", icon:"layers", title:"Software Development", cat:"Software", desc:"Custom software and internal platforms engineered around your exact business logic.", tech:["Java",".NET","Python","Microservices"] },
    { id:"ui-ux-design", icon:"pen", title:"UI/UX Design", cat:"UI/UX", desc:"Research-driven interface design that turns complex products into intuitive experiences.", tech:["Figma","Design Systems","Prototyping","User Testing"] },
    { id:"artificial-intelligence", icon:"spark", title:"Artificial Intelligence", cat:"AI", desc:"AI-powered automation, copilots and decision engines built on your own data.", tech:["LLMs","NLP","Computer Vision","RAG"] },
    { id:"machine-learning", icon:"chip", title:"Machine Learning", cat:"AI", desc:"Predictive models and intelligent systems that learn from real-world signals.", tech:["Python","TensorFlow","PyTorch","MLOps"] },
    { id:"cloud-solutions", icon:"cloud", title:"Cloud Solutions", cat:"Software", desc:"Secure, scalable cloud infrastructure engineered for uptime and elastic growth.", tech:["AWS","Azure","Kubernetes","Terraform"] },
    { id:"cyber-security", icon:"shield", title:"Cyber Security", cat:"Software", desc:"End-to-end security assessments, hardening and monitoring for digital assets.", tech:["Pen Testing","SOC2","Zero Trust","SIEM"] },
    { id:"it-consulting", icon:"compass", title:"IT Consulting", cat:"Software", desc:"Technology strategy and digital transformation roadmaps aligned to business goals.", tech:["Strategy","Architecture","Roadmapping","Audits"] }
  ],

  technologies: {
    Frontend: ["HTML5","CSS3","JavaScript","React","Next.js"],
    Backend:  ["Node.js","Python","Java","PHP"],
    Database: ["MySQL","PostgreSQL","MongoDB"],
    Cloud:    ["AWS","Microsoft Azure","Google Cloud"],
    "AI / ML":["Python","TensorFlow","Scikit-learn"],
    DevOps:   ["Docker","Git","GitHub","CI/CD"]
  },

  projects: [
    { id:"p1", title:"E-Commerce Platform", cat:"Web", tags:["React","Node.js","Stripe"], desc:"A full-featured storefront with real-time inventory, cart and checkout flows.", color:"1" },
    { id:"p2", title:"AI Customer Support System", cat:"AI", tags:["LLM","RAG","Python"], desc:"An AI copilot that resolves tier-1 support tickets and escalates intelligently.", color:"2" },
    { id:"p3", title:"Hospital Management System", cat:"Software", tags:["Java","PostgreSQL"], desc:"Patient records, scheduling and billing unified into one operational platform.", color:"3" },
    { id:"p4", title:"School Management Platform", cat:"Web", tags:["Next.js","MongoDB"], desc:"Attendance, grading and parent communication in a single connected system.", color:"4" },
    { id:"p5", title:"Real Estate Portal", cat:"Web", tags:["React","Maps API"], desc:"Listing discovery platform with saved searches and agent messaging.", color:"5" },
    { id:"p6", title:"Banking Dashboard", cat:"UI/UX", tags:["Figma","Design System"], desc:"A reimagined retail-banking dashboard focused on clarity and trust.", color:"6" },
    { id:"p7", title:"Food Delivery Application", cat:"Mobile", tags:["React Native","Node.js"], desc:"Live order tracking and multi-vendor logistics for a delivery marketplace.", color:"1" },
    { id:"p8", title:"Business Analytics Dashboard", cat:"AI", tags:["Python","ML","D3.js"], desc:"Predictive analytics surfacing revenue trends and churn risk in real time.", color:"2" }
  ],

  team: [
    { name:"Rohan Sharma", role:"CEO & Founder", bio:"Leads company vision and long-term technology strategy.", i:"RS" },
    { name:"Arjun Mehta", role:"CTO", bio:"Owns engineering architecture across every client platform.", i:"AM" },
    { name:"Priya Singh", role:"UI/UX Lead", bio:"Shapes every product experience Nexora ships to clients.", i:"PS" },
    { name:"Aditya Verma", role:"Senior Developer", bio:"Builds and scales complex web and cloud applications.", i:"AV" },
    { name:"Sneha Gupta", role:"AI/ML Engineer", bio:"Designs the intelligent systems behind Nexora's AI products.", i:"SG" },
    { name:"Rahul Kumar", role:"Project Manager", bio:"Keeps delivery on time, on scope and on budget.", i:"RK" }
  ],

  testimonials: [
    { name:"Meera Kapoor", company:"Founder, Urbana Retail", rating:5, quote:"Nexora rebuilt our storefront and conversions rose within the first month. Communication was excellent throughout.", i:"MK" },
    { name:"Vikram Nair", company:"COO, FinEdge", rating:5, quote:"Their team delivered a banking dashboard that our support tickets dropped noticeably after launch.", i:"VN" },
    { name:"Ananya Iyer", company:"Head of Product, CarePlus", rating:5, quote:"The AI support system now handles most of our tier-1 volume automatically. Genuinely transformative.", i:"AI" },
    { name:"Karan Malhotra", company:"CEO, Swiftly Logistics", rating:4, quote:"Solid engineering, clear timelines, and a team that actually explains trade-offs instead of hiding them.", i:"KM" }
  ],

  jobs: [
    { title:"Frontend Developer", loc:"Remote / Bengaluru", type:"Full-time", exp:"2–4 yrs" },
    { title:"Backend Developer", loc:"Remote / Pune", type:"Full-time", exp:"3–5 yrs" },
    { title:"Full Stack Developer", loc:"Bengaluru", type:"Full-time", exp:"3–6 yrs" },
    { title:"UI/UX Designer", loc:"Remote", type:"Full-time", exp:"2–4 yrs" },
    { title:"AI/ML Engineer", loc:"Hyderabad", type:"Full-time", exp:"3–5 yrs" },
    { title:"Digital Marketing Executive", loc:"Remote", type:"Full-time", exp:"1–3 yrs" }
  ],

  blog: [
    { id:"b1", title:"How Artificial Intelligence Is Reshaping Enterprise Software", cat:"Artificial Intelligence", excerpt:"AI is no longer a bolt-on feature — it's becoming the operating layer of modern enterprise software.", date:"2026-06-02" },
    { id:"b2", title:"A Practical Guide to Modern Web Development in 2026", cat:"Web Development", excerpt:"From edge rendering to component-driven design systems, here's what actually matters this year.", date:"2026-05-18" },
    { id:"b3", title:"Cyber Security Essentials Every Growing Business Needs", cat:"Cyber Security", excerpt:"The fundamentals that stop the vast majority of real-world breaches before they start.", date:"2026-05-04" },
    { id:"b4", title:"Cloud Computing: Choosing the Right Architecture for Scale", cat:"Cloud Computing", excerpt:"Not every workload needs Kubernetes. A grounded look at picking the right cloud shape.", date:"2026-04-21" },
    { id:"b5", title:"The Future of Technology: Five Trends Worth Watching", cat:"Future of Technology", excerpt:"From ambient computing to autonomous agents, the signals worth paying attention to now.", date:"2026-04-09" },
    { id:"b6", title:"Digital Transformation: Where Most Initiatives Actually Fail", cat:"Digital Transformation", excerpt:"It's rarely the technology. Here's what separates transformations that stick from ones that stall.", date:"2026-03-27" }
  ]
};
