# Puckload-poc - Proof of Concept for Custom Page Builder in Payload CMS

**Puckload-poc** is a proof of concept demonstrating how to build a custom block builder UI within Payload CMS. This replace the default page builder with a fully customizable block editor.

## Key Concept

Instead of using Payload's default builder, we've created a custom block builder (Puckload-poc) inside the Payload admin panel.

## PR Reference

For details on what was done during the development of this proof of concept, check out the [PR #1](https://github.com/Copystrike/puckload-poc/pull/1). You can see all the modifications and additions made to integrate Puck into the Payload admin panel.

---

## How It Works

1. **Custom Route**:  
   We created a new route at `admin/puck-builder` to handle the block builder UI. This is where the actual block-building UI lives.  
   - File: `src/app/(payload)/admin/puck-builder/page.tsx`

2. **Button Trigger**:  
   Inside the Payload admin panel, we added a button when clicked, it smoothly redirects to the block builder page.  
   - File: `src/fields/puckBuilderField.tsx`

3. **Custom Field & Component**:  
   - **PuckBuilder field**: This custom field is used to display the button inside the Payload admin panel. It replaces the default field with our custom button that opens the editor.  
     - File: `src/fields/puckBuilderField.tsx`
   
   - **PuckBuilder component**: This is the core UI and logic behind the block builder. It renders the block editor where users can create and edit blocks.  
     - File: `src/admin/components/PuckBuilder.tsx`

4. **Block Editing**:  
   The actual block-building happens inside the **PuckBuilder component**, where users can add, configure, and edit blocks. However, note that **Payload’s default blocks are not compatible with PuckBuilder** due to different block definition configurations.  
   - File: `src/admin/components/PuckBuilder.tsx`

## Installation

After cloning the repository, follow these steps to set up the project:

1. **Install Dependencies**:  
   Run `pnpm install` to install all necessary dependencies.

2. **Run docker-compose up -d**:  
   This command will start the development environment.

3. **Run pnpm mongodb restore**:  (Execute this command 2 times, it needs to create a folder in the first run)
   This command will restore the database from the provided dump. Make sure you have MongoDB running.

4. **Run pnpm dev**:  
   This command will start the development server. You can access the admin panel at `http://localhost:3000/admin`.

## Limitations

- **Experimental**: This is a **proof of concept** and is not intended for production use.
- **Data Persistence**: Features like saving content and more complex interactions are not yet implemented.
- **Block Compatibility**: Payload's default blocks cannot be used directly in the PuckBuilder. Payload and Puck use different configurations and prop structures for defining blocks. Payload relies on its own configuration system to define and manage blocks, while Puck uses a different approach to define its blocks and their properties. As a result, Payload's native blocks aren't compatible within the custom block builder at this stage.
- **Tightly Coupled Web App**: Currently, PuckBuilder is implemented as part of the web app itself, and is not designed as a plug-and-play plugin. This means that integrating or updating the PuckBuilder requires manual changes to the core Payload setup and may not be as easily updatable or replaceable as a traditional plugin. If Payload or your setup is updated, manual intervention will be necessary to ensure compatibility, unlike plugins that can be easily swapped or updated independently.

---

**Note**: This is meant for testing and experimentation, and is not production-ready.

---

### License

Unlicense License - see the [LICENSE](LICENSE) file for details.
