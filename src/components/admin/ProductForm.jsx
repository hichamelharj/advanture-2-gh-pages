import React from 'react';
import { CATEGORIES } from '../../data/products';
import { productImage } from '../../lib/format';

const EMPTY = {
  name: '', category: CATEGORIES[0].id, price: '', compareAt: '', stock: '', sizes: 'S, M, L, XL, XXL',
  image: '', description: '', featured: false,
};

// Shrink uploaded photos so they fit in browser storage (~5 MB in total).
const resizeImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(new Error('Lecture du fichier impossible.'));
  reader.onload = () => {
    const img = new Image();
    img.onerror = () => reject(new Error('Image illisible.'));
    img.onload = () => {
      const scale = Math.min(1, 900 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.78));
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

const ProductForm = ({ initial, onSave, onCancel, existingCategories }) => {
  const [form, setForm] = React.useState(() => (initial ? {
    ...EMPTY,
    ...initial,
    price: String(initial.price ?? ''),
    compareAt: initial.compareAt ? String(initial.compareAt) : '',
    stock: String(initial.stock ?? ''),
    sizes: (initial.sizes ?? []).join(', '),
  } : EMPTY));
  const [error, setError] = React.useState('');
  const categories = [...new Set([...CATEGORIES.map(category => category.id), ...existingCategories])];

  const set = field => event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm(previous => ({ ...previous, [field]: value }));
  };

  const handleUpload = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImage(file);
      setForm(previous => ({ ...previous, image: dataUrl }));
      setError('');
    } catch (uploadError) {
      setError(uploadError.message);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const price = Number(form.price);
    const stock = Number(form.stock);
    const compareAt = form.compareAt ? Number(form.compareAt) : undefined;
    const sizes = form.sizes.split(',').map(size => size.trim()).filter(Boolean);
    if (form.name.trim().length < 2) return setError('Le nom est obligatoire.');
    if (!Number.isFinite(price) || price <= 0) return setError('Prix invalide.');
    if (!Number.isInteger(stock) || stock < 0) return setError('Le stock doit être un nombre entier ≥ 0.');
    if (compareAt !== undefined && (!Number.isFinite(compareAt) || compareAt <= price)) return setError('L’ancien prix doit être supérieur au prix.');
    if (sizes.length === 0) return setError('Indiquez au moins une taille (ou « Unique »).');
    if (!form.image) return setError('Ajoutez une image (fichier ou lien).');
    setError('');
    onSave({
      ...(initial ?? {}),
      name: form.name.trim(),
      category: form.category.trim().toUpperCase(),
      price, stock, sizes,
      compareAt,
      image: form.image.trim(),
      description: form.description.trim(),
      featured: Boolean(form.featured),
    });
    return undefined;
  };

  return (
    <form onSubmit={handleSubmit} className="admin-card grid gap-4 md:grid-cols-[180px_1fr]" noValidate>
      <div>
        <div className="aspect-[4/5] overflow-hidden border border-luxe-beige bg-luxe-beige/30">
          {form.image ? <img src={productImage(form.image)} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-xs text-luxe-charcoal/50">Aucune image</div>}
        </div>
        <label className="button-outline mt-3 w-full cursor-pointer !min-h-10 !py-2">
          Choisir une photo
          <input type="file" accept="image/*" onChange={handleUpload} className="sr-only" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="admin-label sm:col-span-2">Nom
          <input className="form-field" value={form.name} onChange={set('name')} required />
        </label>
        <label className="admin-label">Catégorie
          <input className="form-field" list="admin-categories" value={form.category} onChange={set('category')} />
          <datalist id="admin-categories">{categories.map(category => <option key={category} value={category} />)}</datalist>
        </label>
        <label className="admin-label">Tailles (séparées par des virgules)
          <input className="form-field" value={form.sizes} onChange={set('sizes')} />
        </label>
        <label className="admin-label">Prix (DH)
          <input className="form-field" type="number" min="1" value={form.price} onChange={set('price')} />
        </label>
        <label className="admin-label">Ancien prix (DH, facultatif)
          <input className="form-field" type="number" min="1" value={form.compareAt} onChange={set('compareAt')} />
        </label>
        <label className="admin-label">Stock
          <input className="form-field" type="number" min="0" step="1" value={form.stock} onChange={set('stock')} />
        </label>
        <label className="admin-label">Image (lien ou chemin)
          <input className="form-field" value={form.image.startsWith('data:') ? '(photo importée)' : form.image} onChange={set('image')} placeholder="products/mon-hoodie.jpg" />
        </label>
        <label className="admin-label sm:col-span-2">Description
          <textarea className="form-field resize-y" rows={3} value={form.description} onChange={set('description')} />
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={form.featured} onChange={set('featured')} className="accent-luxe-green" /> Mettre en avant (accueil)
        </label>
        {error && <p role="alert" className="text-sm text-luxe-copper sm:col-span-2">{error}</p>}
        <div className="flex gap-3 sm:col-span-2">
          <button type="submit" className="button-dark">{initial ? 'Enregistrer' : 'Ajouter le produit'}</button>
          <button type="button" onClick={onCancel} className="button-outline">Annuler</button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
