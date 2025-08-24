//CLASS
export class Post {
  constructor(title, content, publish) {
    this.title = title;
    this.content = content;
    this.publish = publish;
  }

  display() {
    console.log(`Title: ${this.title}\nContent: ${this.content}\nPublished: ${this.publish}`);
  }
}
