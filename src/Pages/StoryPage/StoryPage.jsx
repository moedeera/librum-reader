import "quill/dist/quill.snow.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "./StoryPage.css";
import { SiteContext } from "../../Context/Context";
import { loremIpsum, storiesInfo } from "../../Context/Content";
import { db } from "../../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { findImageSet, imagesSorted } from "../../assets/images/images";

export const StoryPage = () => {
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");

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
          bold: true,
        },
        insert: "Introduction",
      },
      {
        insert:
          "\n\nThe realms of quantum physics and the human mind have long been subjects of fascination and exploration in their respective domains. Yet, the intersection of these two enigmatic domains raises intriguing questions about the nature of consciousness itself. Can the principles of quantum mechanics shed light on the mysteries of the human mind? In this essay, we delve into the captivating exploration of quantum consciousness, as physicists venture into the frontiers of science to unravel the enigmatic connection between quantum physics and human consciousness.\n\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "Quantum Mechanics: The Foundation",
      },
      {
        insert:
          "\nTo understand the connection between quantum mechanics and consciousness, we must first comprehend the fundamental principles of quantum physics. Quantum mechanics, developed in the early 20th century, provides a framework to describe the behavior of particles on the smallest scales, where classical physics breaks down. Key features of quantum mechanics, such as superposition and entanglement, have challenged our classical understanding of reality.\n\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "The Mystery of Consciousness",
      },
      {
        insert:
          "\nConsciousness, on the other hand, remains one of the most elusive and profound phenomena in human existence. While science has made great strides in understanding the brain's neural processes, the subjective experience of consciousness itself continues to defy a complete explanation. It is this very mystery that has driven physicists and researchers to explore whether the strange and counterintuitive principles of quantum mechanics might hold clues to understanding consciousness.\n\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "Quantum Consciousness Theories",
      },
      {
        insert:
          "\nSeveral theories have emerged at the intersection of quantum physics and consciousness. One prominent theory is the Orch-OR (Orchestrated Objective Reduction) theory proposed by physicist Sir Roger Penrose and anesthesiologist Stuart Hameroff. This theory posits that quantum processes within microtubules in brain neurons may play a role in generating consciousness. According to Orch-OR, the collapse of quantum superpositions within these structures contributes to conscious experiences.\n\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "The Role of Quantum Entanglement",
      },
      {
        insert:
          "\nQuantum entanglement, the phenomenon where particles become correlated in such a way that the state of one instantaneously affects the state of the other, has intrigued physicists for decades. Some theorists speculate that entanglement could play a role in linking the consciousness of individuals or even connecting all living beings through a quantum network. While these ideas remain highly speculative, they highlight the potential significance of quantum phenomena in understanding consciousness.\n\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "Challenges and Controversies",
      },
      {
        insert:
          "\nIt is essential to acknowledge that the exploration of quantum consciousness remains highly controversial within the scientific community. Critics argue that the brain's warm and noisy environment may not be suitable for preserving the delicate quantum states required for consciousness-related processes. Moreover, the lack of empirical evidence linking quantum mechanics directly to consciousness leaves room for skepticism.\n\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "Conclusion",
      },
      {
        insert:
          "\nThe quest to unravel the mysteries of consciousness through the lens of quantum mechanics is a captivating journey into the unknown. While the intersection of quantum physics and the human mind raises thought-provoking questions and opens new avenues for exploration, it is crucial to approach this topic with scientific rigor and skepticism. Whether or not quantum mechanics can provide a comprehensive explanation for consciousness remains an open question, but the pursuit of knowledge at this intriguing frontier continues to inspire scientists and philosophers alike. As we continue to explore the enigmatic connection between quantum physics and consciousness, we may one day unlock the secrets of the universe's most profound phenomenon: the human mind.\n",
      },
    ];

    if (localStorage.getItem("item-GsimZYIq7ba0lZNMZQNo")) {
      return;
    }

    try {
      await addDoc(storyData, {
        ref: "GsimZYIq7ba0lZNMZQNo",
        author: "admin",
        likes: 3,
        views: 5,
        comments: 1,
        tags: ["science", "quantum physics", "mind"],
        title: "The Quantum Mind",
        story: data,
        date: "Nov 30 2023",
        pic: "https://images.pexels.com/photos/12180254/pexels-photo-12180254.jpeg?auto=compress&cs=tinysrgb&w=600",
      });

      localStorage.setItem("item-8Ho4RkYMaN8IYfEkJ9S4", true);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const [postData, setPostData] = useState("");
  const { story } = useContext(SiteContext);
  let info = { title: "Legend of the Lurkers" };

  useEffect(() => {
    if (story) {
      info.title = story;
      console.log(story);
    }
  }, [story]);

  // useEffect(() => {
  //   submitStory();
  // }, []);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    // Create a new Quill editor
    const editor = document.createElement("div");
    editor.setAttribute("id", "quill-editor");
    wrapper.append(editor);

    // Initialize Quill on the editor
    const quill = new Quill(editor, {
      theme: "snow",
      readOnly: true,
      modules: {
        toolbar: false, // Disable the toolbar
      },
    });
    const savedData = localStorage.getItem("savedData");
    if (savedData && savedData !== null) {
      console.log(JSON.parse(savedData));
      quill.setContents(JSON.parse(savedData));
    } else {
      // quill.setText("Hello\n");
      quill.setContents(loremIpsum);
    }

    // Log new characters when the user edits the content
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        // This logs the changes made by the user
        const content = quill.root.innerHTML;
        setPostData(content);
      }
    });

    // Cleanup function
    return () => {
      quill.off("text-change");
      wrapper.innerHTML = "";
    };
  }, []);
  return (
    <div className="container">
      <div className="story-page">
        <div className="story-header-container">
          {" "}
          <small className="story-category-small">Fiction</small>
          <h3 className="story-page-header">{info.title}</h3>
          <small>by John Smith</small>
        </div>

        <div className="story-container">
          <div className="story-stats">
            <div className="story-user">
              <div
                style={{
                  backgroundImage: `url("${
                    findImageSet("fantasy", imagesSorted)[1]
                  }")`,
                }}
                className="story-user-image"
              ></div>
              <p>John Smith</p>
            </div>
            <div className="story-stats-container">
              <div className="single-story-stat">
                {"100"}{" "}
                <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
              </div>
              <div className="single-story-stat">
                {"33"}{" "}
                <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
              </div>
              <div className="single-story-stat">
                {"8"}{" "}
                <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
              </div>
            </div>
          </div>

          <div
            className="story-page"
            ref={wrapperRef}
            id="quill-container"
          ></div>
          <div className="story-side-info">
            <div className="story-info-summary">
              <p>Synopsis:</p>
              <small>
                Astronomers recount their experiences in deciphering signals
                from distant galaxies. These cosmic messages, once decoded,
                reveal the voices of civilizations far beyond our own, sparking
                reflections on the vastness of the universe....
              </small>
              <p>Tags:</p>
              {"[science, space, physics]"}
              <br />
              <p>670 words</p>
              <small>Last Edited : November 23 2023</small>
            </div>
            <div className="story-info-summary">
              <p>Similiar stories:</p>
              <div className="similar-stories-container">
                <div className="similar-story">
                  <div className="ss-image"></div>
                  <div className="ss-story-title"></div>
                  <div className="ss-story-author"></div>
                </div>
              </div>
            </div>

            <div className="test-block-lower"></div>
          </div>
        </div>

        <div className="story-button-container">
          {/* <button id="edit-button" className="btn btn-primary btn-green">
            Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};
