const { widget, showUI, ui } = figma;
const { AutoLayout, Rectangle, Frame } = widget;

enum Note {
  C = "C",
  CSharp = "C#",
  D = "D",
  DSharp = "D#",
  E = "E",
  F = "F",
  FSharp = "F#",
  G = "G",
  GSharp = "G#",
  A = "A",
  ASharp = "A#",
  B = "B",
}

interface Message {
  sound: Note;
}

function Widget() {
  const sharpNotes = [
    { note: Note.CSharp, left: 50 },
    { note: Note.DSharp, left: 170 },
    { note: Note.FSharp, left: 400 },
    { note: Note.GSharp, left: 520 },
    { note: Note.ASharp, left: 640 },
  ];
  const notes: Note[] = [
    Note.C,
    Note.D,
    Note.E,
    Note.F,
    Note.G,
    Note.A,
    Note.B,
  ];

  function openUI(sound: Note, options: ShowUIOptions = { height: 300 }) {
    return new Promise<void>((resolve) => {
      showUI(__html__, options);

      const data: Message = { sound };
      ui.postMessage(data);

      ui.once("message", () => {
        resolve();
      });
    });
  }

  return (
    <Frame width={900} height={550}>
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="start"
        verticalAlignItems="center"
        height="hug-contents"
        padding={{left: 8}}
        fill="#FFFFFF"
        spacing={12}
      >
        {notes.map((note, ind) => (
          <Rectangle
            key={ind}
            width={100}
            height={500}
            fill="#ffffff"
            stroke="#000000"
            strokeWidth={4}
            cornerRadius={8}
            onClick={() => openUI(note, { visible: false })}
          />
        ))}
      </AutoLayout>
      {sharpNotes.map(({ note, left }, ind) => (
        <AutoLayout
          direction="horizontal"
          horizontalAlignItems="start"
          padding={{ left }}
        >
          <Rectangle
            width={90}
            height={300}
            fill="#000000"
            cornerRadius={8}
            onClick={() => openUI(note, { visible: false })}
          />
        </AutoLayout>
      ))}
    </Frame>
  );
}
widget.register(Widget);
