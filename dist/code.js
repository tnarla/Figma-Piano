(() => {
  // widget-src/code.tsx
  var { widget, showUI, ui } = figma;
  var { AutoLayout, Rectangle, Frame, usePropertyMenu } = widget;
  var Note;
  (function(Note2) {
    Note2["C"] = "C";
    Note2["CSharp"] = "C#";
    Note2["D"] = "D";
    Note2["DSharp"] = "D#";
    Note2["E"] = "E";
    Note2["F"] = "F";
    Note2["FSharp"] = "F#";
    Note2["G"] = "G";
    Note2["GSharp"] = "G#";
    Note2["A"] = "A";
    Note2["ASharp"] = "A#";
    Note2["B"] = "B";
    Note2["HighC"] = "HighC";
  })(Note || (Note = {}));
  function Widget() {
    const sharpNotes = [
      { note: Note.CSharp, left: 50 },
      { note: Note.DSharp, left: 170 },
      { note: Note.FSharp, left: 400 },
      { note: Note.GSharp, left: 520 },
      { note: Note.ASharp, left: 640 }
    ];
    const notes = [
      Note.C,
      Note.D,
      Note.E,
      Note.F,
      Note.G,
      Note.A,
      Note.B,
      Note.HighC
    ];
    function openUI(intent, sound, options = { height: 300 }) {
      return new Promise((resolve) => {
        showUI(__html__, options);
        const data = { intent, sound };
        ui.postMessage(data);
        ui.once("message", () => {
          resolve();
        });
      });
    }
    usePropertyMenu([
      {
        tooltip: "Play",
        propertyName: "play",
        itemType: "action"
      }
    ], ({ propertyName }) => {
      if (propertyName === "play") {
        return openUI("keyboard");
      }
    });
    return /* @__PURE__ */ figma.widget.h(Frame, {
      width: 900,
      height: 550
    }, /* @__PURE__ */ figma.widget.h(AutoLayout, {
      direction: "horizontal",
      horizontalAlignItems: "start",
      verticalAlignItems: "center",
      height: "hug-contents",
      padding: { left: 8 },
      fill: "#FFFFFF",
      spacing: 12
    }, notes.map((note, ind) => /* @__PURE__ */ figma.widget.h(Rectangle, {
      key: ind,
      width: 100,
      height: 500,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 4,
      cornerRadius: 8,
      onClick: () => openUI("play", note, { visible: false })
    }))), sharpNotes.map(({ note, left }, ind) => /* @__PURE__ */ figma.widget.h(AutoLayout, {
      direction: "horizontal",
      horizontalAlignItems: "start",
      padding: { left }
    }, /* @__PURE__ */ figma.widget.h(Rectangle, {
      width: 90,
      height: 300,
      fill: "#000000",
      cornerRadius: 8,
      onClick: () => openUI("play", note, { visible: false })
    }))));
  }
  widget.register(Widget);
})();
