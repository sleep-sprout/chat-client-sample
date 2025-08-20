// remarkMention.ts
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import Markdown, { Components } from "react-markdown";

export const remarkMention: Plugin = () => {
  return (tree) => {
    visit(tree, "text", (node: any, index, parent: any) => {
      console.log(node);
      console.log(parent);

      if (parent && parent.type !== "paragraph") {
        return;
      }

      const regex = /(?:^|\s)@(all|[a-zA-Z0-9._-]+)/g;
      let match;
      const newNodes: any[] = [];
      let lastIndex = 0;

      while ((match = regex.exec(node.value)) !== null) {
        console.log("match");
        const prefix = match[0].startsWith(" ") ? " " : "";
        const target = match[1]; // all or userId

        // 直前のテキスト
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // mention ノード
        if (target === "all") {
          newNodes.push({
            type: "text",
            value: "all",
            data: {
              displayName: "全員",
              hName: "mention",
            },
          });
        } else {
          newNodes.push({
            type: "text",
            value: target,
            data: {
              displayName: target,
              hName: "mention",
            },
          });
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < node.value.length) {
        newNodes.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      console.log(newNodes);

      if (newNodes.length > 0 && parent && typeof index === "number") {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
};

const markdown = `
Hello @ryota, please check with @alice! @all

~~~ts
console.log("test");
@ryota
~~~
`;

export const ChatPage = () => {
  return (
    <div>
      <h1>Chat Page</h1>
      <Markdown
        remarkPlugins={[remarkMention]}
        components={{
          mention: ({ node, ...props }) => {
            console.log(node);
            console.log(props);
            return (<span>{props.children as string}</span>);
          },
        } as Components }
      >
        {markdown}
      </Markdown>
    </div>
  );
};
