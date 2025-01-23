export const mockQuestions = [
  {
    id: 1,
    question: "Can you describe your experience with deploying machine learning models on cloud platforms, and any challenges you've faced in ensuring their reliability and scalability?",
    answer: "I've deployed models using AWS Sagemaker and Azure ML, where I incorporated CI/CD pipelines using services like GitHub Actions and AWS CodePipeline. One challenge was ensuring the model could scale to handle variable traffic without downtime. To solve this, I leveraged auto-scaling groups, load balancers, and serverless endpoints. I also continuously monitored model performance through custom logging and metrics, which allowed me to automatically trigger model retraining when performance declined."
  },
  {
    id: 2,
    question: "How do you approach prioritizing features in a product roadmap when faced with competing stakeholder demands?",
    answer: "I use a framework that combines impact vs effort analysis with strategic alignment. First, I gather requirements from stakeholders and quantify the potential business impact using metrics like revenue potential, user engagement, or operational efficiency. Then, I assess implementation effort with engineering teams. I plot these on a 2x2 matrix to identify quick wins and strategic initiatives. Finally, I align with company OKRs to ensure we're building features that serve our long-term vision."
  },
  {
    id: 3,
    question: "Tell me about a time when you had to make a difficult product decision with incomplete information.",
    answer: "In my previous role, we had to decide whether to rebuild our checkout flow during a critical Q4 period. We had signals of user drop-off but limited data due to tracking issues. I ran a combination of qualitative user interviews and A/B tests on smaller components to gather insights quickly. This hybrid approach helped us identify critical pain points and implement a phased solution that improved conversion by 15% while minimizing risk."
  },
  {
    id: 4,
    question: "How would you improve Google Maps for visually impaired users?",
    answer: "I'd approach this by first conducting user research with visually impaired individuals to understand their specific navigation needs. Key features might include enhanced voice guidance with more detailed environmental descriptions, haptic feedback for direction changes, and integration with accessibility devices. I'd also implement AI-powered scene description to provide context about surroundings and potential obstacles."
  },
  {
    id: 5,
    question: "What metrics would you use to measure the success of a new feature in a productivity app?",
    answer: "I'd focus on both engagement and outcome metrics. For engagement: daily/weekly active users, feature adoption rate, and time spent using the feature. For outcomes: task completion rate, time saved compared to previous workflow, and user satisfaction scores. I'd also track negative metrics like error rates or feature abandonment to identify potential issues. Finally, I'd measure the feature's impact on core product metrics like retention and user lifetime value."
  }
];