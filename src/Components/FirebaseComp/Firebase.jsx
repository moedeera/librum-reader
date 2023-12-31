import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase-config";

export const Firebase = () => {
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");
  const [storyFirebase, setStoryFirebase] = useState([]);
  const submitStorySummaries = async () => {
    const summaries = storiesInfo;
    if (localStorage.getItem("summaries-submitted")) {
      return;
    }

    try {
      for (var j = 0; j < summaries.length; j++) {
        console.log(summaries[j]);
        await addDoc(storySummaries, summaries[j]);
      }

      localStorage.setItem("summaries-submitted", true);
    } catch (error) {
      console.log(error);
    }
  };

  const submitStory = async () => {
    console.log("called");
    const data = [
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "The Spark of Innovation",
      },
      {
        insert:
          "\nIt all begins with a spark—a flicker of an idea that has the potential to change the world. This initial spark can be triggered by various sources: a pressing problem, a customer's unmet need, or simply a wild dream. The business mogul recounts how their own journey of innovation began with a moment of clarity. They were inspired by a desire to solve a prevalent issue in their industry, something that had eluded even the brightest minds for years.\nBut the spark of innovation is not enough; it's just the beginning. To transform that spark into a blazing fire of creativity, one must nurture it with knowledge, curiosity, and a relentless pursuit of excellence.\n\n",
      },
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "The Role of Research and Knowledge",
      },
      {
        insert:
          "\nInnovation is not just about having a brilliant idea; it's about knowing how to execute it effectively. The business mogul emphasizes the significance of research and knowledge as the foundation of their creative journey. They believe that a deep understanding of their industry, its trends, and its pain points is crucial.\nTo gain this knowledge, they invested time in reading, attending conferences, and networking with experts. They understood that innovation is often the result of connecting seemingly unrelated dots, and the broader their knowledge base, the more dots they could connect. This continuous pursuit of knowledge became the cornerstone of their creative process.\n\n",
      },
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "Embracing Challenges as Catalysts",
      },
      {
        insert:
          "\nThe road to innovation is rarely smooth; it's riddled with obstacles, doubts, and setbacks. The business mogul speaks candidly about the numerous challenges they faced along the way. These challenges were not roadblocks but rather catalysts that fueled their creativity.\nThey share stories of sleepless nights, failed prototypes, and skeptical investors. Each setback was a valuable lesson, an opportunity to refine their idea, and an invitation to think outside the box. The ability to embrace challenges as stepping stones to success became a defining characteristic of their creative journey.\n\n",
      },
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "Collaboration and Teamwork",
      },
      {
        insert:
          "\nInnovation is not a solitary endeavor. The business mogul acknowledges the pivotal role that collaboration and teamwork played in their journey. They surrounded themselves with a diverse team of talented individuals who shared their passion for the idea.\nThe power of diverse perspectives cannot be overstated. The mogul describes how brainstorming sessions often led to unexpected breakthroughs, as team members from different backgrounds brought fresh ideas and viewpoints to the table. It was through collaboration that their initial spark evolved into a fully-fledged innovation.\n\n",
      },
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "The Art of Iteration",
      },
      {
        insert:
          "\nCreating groundbreaking innovations is rarely a one-shot affair. The mogul stresses the importance of iteration in the creative process. They recount how they continuously refined their product, incorporating user feedback and staying attuned to evolving market demands.\nThe art of iteration is not just about making minor tweaks; it's about having the courage to pivot when necessary. Sometimes, the path to innovation requires changing course entirely, and the mogul shares their experiences of recognizing when to pivot and when to persevere.\n\n",
      },
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "Fostering a Culture of Creativity",
      },
      {
        insert:
          "\nAs their journey unfolded, the business mogul realized the significance of fostering a culture of creativity within their organization. They cultivated an environment where employees were encouraged to experiment, take risks, and think innovatively. This culture of creativity extended beyond the R&D department; it permeated every aspect of their company.\nThey also stressed the importance of celebrating failures as valuable learning experiences. In a culture that embraced both success and failure, employees felt empowered to push the boundaries of what was possible.\n\n",
      },
      {
        attributes: {
          color: "var(--tw-prose-bold)",
          bold: true,
        },
        insert: "The Science of Execution",
      },
      {
        insert:
          "\nInnovation is not just about creativity; it's also about execution. The business mogul underscores the importance of having a robust strategy for bringing innovations to market. This involves careful planning, resource allocation, and a clear understanding of the competitive landscape.\nThey speak of the need to secure funding, build partnerships, and create a compelling narrative that resonates with customers and investors alike. The science of execution, they emphasize, is what transforms a brilliant idea into a successful product or service.\nIn conclusion, the journey of creating groundbreaking innovations is a complex, multifaceted odyssey. It begins with a spark of inspiration but requires the nurturing of creativity through research, resilience in the face of challenges, collaboration with diverse teams, and a commitment to continuous iteration. Fostering a culture of creativity and executing the innovation effectively are also crucial elements of this journey. The business mogul's reflections provide a roadmap for aspiring innovators, shedding light on the art and science of turning visionary ideas into reality.\n",
      },
    ];

    if (localStorage.getItem("item-GsimZYIq7ba0lZNMZQNo")) {
      return;
    }

    try {
      await addDoc(storyData, {
        ref: "mvQxqnjdhGzpVVQLXK1F",
        author: "admin",
        likes: 0,
        views: 0,
        comments: 0,
        tags: ["business", "innovation", "creativity"],
        title: "The Art of Innovation",
        story: data,
        date: "Dec 21 2023",
        pic: "https://images.pexels.com/photos/12180254/pexels-photo-12180254.jpeg?auto=compress&cs=tinysrgb&w=600",
      });

      localStorage.setItem("mvQxqnjdhGzpVVQLXK1", true);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStory = async (id) => {
    console.log("id is :", id);
    try {
      const storyDoc = doc(db, "stories", id);
      const docSnapshot = await getDoc(storyDoc);

      if (docSnapshot.exists()) {
        const summaryData = docSnapshot.data();
        setStoryFirebase(summaryData);
        console.log(storyFirebase);
        // setSuccess(true);

        // setLoading(false);
      } else {
        console.log("Story not found.");
        setStoryFirebase("error");
        // setLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return <div>Firebase</div>;
};
