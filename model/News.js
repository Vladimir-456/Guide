const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['heading', 'paragraph', 'list']
    },
    text: {
        type: String,
        required: function() {
            return this.type !== 'list';
        }
    },
    items: {
        type: [String],
        required: function() {
            return this.type === 'list';
        }
    }
});

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    shortContent: {
        type: String,
        required: [true, 'Short content is required'],
        trim: true
    },
    content: {
        type: {
            sections: [sectionSchema]
        },
        required: [true, 'Content is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

newsSchema.index({ slug: 1 });
newsSchema.index({ date: -1 });

newsSchema.pre('save', async function(next) {
  if(!this.slug){
    this.slug = this.title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  }
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
