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
          color: "var(--text-primary)",
          bold: true,
        },
        insert: "Whispers in the Wind: The Enigma Unveiled",
      },
      {
        insert:
          "\n\nNestled between rolling hills and meandering streams, the quaint town of Everwood had long been a haven of tranquility. Life unfolded at a leisurely pace, and the townspeople found solace in the routine of their close-knit community. However, an unexpected shift occurred when an eerie phenomenon descended upon the town, shattering the tranquility that once defined Everwood.\n\nIt all began with a gentle breeze, carrying whispers that seemed to emanate from the very fabric of the wind. At first, the townspeople dismissed these murmurs as figments of their imagination, a consequence of living in a town where everyone knew everyone else's business. Yet, as the whispers persisted, growing more insistent with each passing day, a sense of unease settled over Everwood.\n\nThe whispers, carried by the wind like cryptic messengers, soon became a topic of hushed conversations among the townspeople. What were these mysterious voices trying to convey? Were they a harbinger of good fortune or an omen of impending doom? The once familiar faces now bore expressions of apprehension, and a collective anxiety lingered in the air.\n\nWord spread through Everwood like wildfire, and a town meeting was convened at the old community hall. The mayor, a venerable figure known for his steady demeanor, addressed the gathering. He spoke of the whispers in the wind and the need for unity in the face of the unknown. The townspeople, though apprehensive, rallied together, determined to decipher the enigmatic messages that surrounded them.\n\nAs dusk settled over Everwood, a group of curious individuals gathered in the town square, their faces illuminated by the glow of lanterns. Among them was Clara, a librarian with a penchant for unraveling mysteries, and Samuel, a weathered farmer with an uncanny connection to the land. Together, they formed an unlikely alliance, bound by a shared determination to understand the whispers and protect their town from an unseen threat.\n\nThe townspeople began to document the patterns of the wind, noting the subtle shifts that coincided with the whispers. Clara, armed with a collection of ancient books on folklore and mysticism, delved into the town's archives in search of clues. Samuel, attuned to the rhythms of nature, spent hours observing the wind's dance through the rustling leaves and swaying branches.\n\nAs they pieced together fragments of information, a chilling revelation emerged – the whispers were foretelling the future. Cryptic messages, veiled in metaphor and symbolism, hinted at events yet to unfold. The townspeople recoiled at the realization that their once-predictable lives were now subject to the whims of an unseen force.\n\nThe whispers grew more urgent, signaling an impending disaster that loomed on the horizon. A sense of urgency gripped Everwood, and the townspeople intensified their efforts to interpret the messages. Late into the night, they convened in the community hall, poring over maps and diagrams, attempting to decipher the cryptic language carried by the wind.\n\nClara, fueled by a relentless curiosity, uncovered an ancient legend that spoke of a celestial alignment known as the \"Whispering Convergence.\" According to the legend, when the stars aligned in a specific configuration, the wind would carry messages foretelling events of great significance. The townspeople, though skeptical, realized that they were on the precipice of a momentous event tied to the cosmic forces that governed their existence.\n\nWith newfound determination, the townspeople set out to prepare for the impending disaster. They reinforced buildings, stocked up on supplies, and established an emergency response team. Everwood, once a haven of serenity, now echoed with the sounds of hammering and the voices of people strategizing to defy fate.\nAs the final days before the Whispering Convergence approached, the whispers in the wind grew louder, their urgency reaching a fevered pitch. The townspeople, fueled by a mix of trepidation and resilience, gathered in the town square for a communal vigil. The night sky, adorned with stars, seemed to mirror the uncertainty that hung over Everwood.\n\nIn the next chapter of Everwood's tale, the Whispering Convergence would unfold, revealing the destiny written in the stars and whispered by the wind. The townspeople, bound by a shared purpose, stood united against the mysterious forces that sought to challenge their way of life. The journey into the unknown had only just begun, and Everwood braced itself for the revelation that awaited on the horizon.\n",
      },
    ];

    if (localStorage.getItem("item-8Ho4RkYMaN8IYfEkJ9S4")) {
      return;
    }

    try {
      await addDoc(storyData, {
        ref: "8Ho4RkYMaN8IYfEkJ9S4",
        author: "admin",
        tags: ["mystery", "supernatural", "small town"],
        title: "Whispers in the Wind: The Enigma Unveiled",
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
          <div className="test-block">
            <div className="test-block-upper">
              <p>Similar Stories</p>
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
