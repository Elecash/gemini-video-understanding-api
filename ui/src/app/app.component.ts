import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    fb = inject(FormBuilder);

    form = this.fb.group({
        youtubeUrl: 'https://www.youtube.com/watch?v=Mot-JEU26GQ',
        instructions: 'Resume video',
        response: { value: '', disabled: true }
    });

    loading = signal(false);

    async onSubmit() {
        if (this.form.invalid) return;

        const { youtubeUrl, instructions } = this.form.value;
        this.loading.set(true);

        this.form.patchValue({ response: '' });

        try {
            const res = await fetch('http://localhost:3000/api/process-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ youtubeUrl, instructions })
            });

            const data = await res.json();

            this.form.patchValue({ response: data.result.response });
        } catch (err) {
            this.form.patchValue({ response: 'Error: ' + (err as any).message });
        } finally {
            this.loading.set(false);
        }
    }
}
